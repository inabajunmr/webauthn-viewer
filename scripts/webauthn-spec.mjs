import { createHash } from "node:crypto";
import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { parse as parseHtml } from "parse5";
import { parse as parseIdl, write as writeIdl } from "webidl2";

const specUrl = "https://www.w3.org/TR/webauthn-4/";
const specFolder = new URL("../spec/", import.meta.url);
const snapshotFile = new URL("webauthn-4.json", specFolder);
const suggestionsFile = new URL("../src/webauthnSpecSuggestions.js", import.meta.url);
const versionUrlPattern = /^https:\/\/www\.w3\.org\/TR\/\d{4}\/[A-Z]+-webauthn-4-\d{8}\/$/;

// Keep existing choices in their UI order and append new choices from the spec.
const suggestionEnums = {
  credentialTypes: ["PublicKeyCredentialType", ["public-key"]],
  attestation: ["AttestationConveyancePreference", ["none", "direct", "indirect", "enterprise"]],
  authenticatorAttachment: ["AuthenticatorAttachment", ["platform", "cross-platform"]],
  residentKey: ["ResidentKeyRequirement", ["required", "preferred", "discouraged"]],
  userVerification: ["UserVerificationRequirement", ["required", "preferred", "discouraged"]],
  transports: ["AuthenticatorTransport", ["usb", "ble", "nfc", "internal", "hybrid", "smart-card"]],
  hints: ["PublicKeyCredentialHint", ["security-key", "client-device", "hybrid"]],
};
const automaticEnums = new Set(Object.values(suggestionEnums).map(([name]) => name));

function findNode(node, matches) {
  if (matches(node)) {
    return node;
  }
  for (const child of node.childNodes ?? []) {
    const found = findNode(child, matches);
    if (found) {
      return found;
    }
  }
}

function textContent(node) {
  if (node.nodeName === "#text") {
    return node.value;
  }
  return (node.childNodes ?? []).map(textContent).join("");
}

export function readPublicationUrl(html) {
  const term = findNode(parseHtml(html), node =>
    node.tagName === "dt" && textContent(node).trim() === "This version:",
  );
  const siblings = term?.parentNode.childNodes;
  const entry = siblings?.slice(siblings.indexOf(term) + 1).find(node => node.tagName);
  const link = entry?.tagName === "dd" && findNode(entry, node => node.tagName === "a");
  const url = link && link.attrs.find(attr => attr.name === "href")?.value;
  if (!versionUrlPattern.test(url ?? "")) {
    throw new Error("The W3C publication does not have a valid dated Level 4 URL.");
  }
  return url;
}

const referenceBlocks = new Set([
  "dd", "div", "dl", "dt", "li", "ol", "p", "pre", "section", "table", "tr", "ul",
]);
const ignoredReferenceTags = new Set(["aside", "details", "nav", "script", "style", "svg", "template"]);

export function readSpecReference(html) {
  const body = findNode(parseHtml(html), node => node.tagName === "body");
  function render(node) {
    if (node.nodeName === "#text") {
      return node.value;
    }
    if (ignoredReferenceTags.has(node.tagName) || node.attrs?.some(attr =>
      attr.name === "hidden" || (attr.name === "aria-hidden" && attr.value === "true"),
    )) {
      return "";
    }
    const text = (node.childNodes ?? []).map(render).join("");
    if (/^h[1-6]$/.test(node.tagName ?? "")) {
      const id = node.attrs.find(attr => attr.name === "id")?.value;
      return `\n\n${text.trim()}${id ? ` [#${id}]` : ""}\n`;
    }
    if (referenceBlocks.has(node.tagName)) {
      return `\n${text.trim()}\n`;
    }
    return node.tagName === "td" || node.tagName === "th" ? `${text} | ` : text;
  }
  return render(body).replace(/\n[ \t]*\n(?:[ \t]*\n)*/g, "\n\n").trim();
}

function signature(node) {
  return writeIdl([node], { templates: { trivia: () => " " } }).trim();
}

export function readSnapshot(html) {
  const index = findNode(parseHtml(html), node =>
    node.attrs?.some(attr => attr.name === "id" && attr.value === "idl-index"),
  );
  if (!index) {
    throw new Error("WebAuthn IDL Index was not found.");
  }

  const siblings = index.parentNode.childNodes;
  const section = [];
  for (const node of siblings.slice(siblings.indexOf(index) + 1)) {
    if (/^h[1-2]$/.test(node.tagName ?? "")) {
      break;
    }
    section.push(node);
  }
  const idl = section
    .map(node => findNode(node, candidate =>
      candidate.tagName === "pre" && candidate.attrs.some(attr =>
        attr.name === "class" && attr.value.split(/\s+/).includes("idl"),
      ),
    ))
    .filter(Boolean)
    .map(textContent)
    .join("\n");

  const definitions = new Map();
  const enums = new Map();
  for (const definition of parseIdl(idl)) {
    if (definition.type === "eof") {
      continue;
    }
    if (definition.type === "enum") {
      enums.set(definition.name, definition.values.map(value => value.value).sort());
      if (!definition.extAttrs.length) {
        continue;
      }
    }
    const name = definition.name ?? definition.target;
    const lines = definitions.get(name) ?? [];
    if (definition.members) {
      const header = [
        signature(definition.extAttrs),
        definition.partial ? "partial" : "",
        definition.type,
        definition.name,
        definition.inheritance ? `: ${definition.inheritance}` : "",
      ].filter(Boolean).join(" ");
      lines.push(header, ...definition.members.map(signature));
    } else {
      lines.push(signature(definition));
    }
    definitions.set(name, lines);
  }

  for (const name of ["PublicKeyCredential", "PublicKeyCredentialCreationOptions", "PublicKeyCredentialRequestOptions"]) {
    if (!definitions.has(name)) {
      throw new Error(`WebAuthn IDL Index is missing ${name}.`);
    }
  }
  for (const [name, lines] of definitions) {
    definitions.set(name, [...new Set(lines)].sort());
  }
  return {
    definitions: Object.fromEntries([...definitions].sort(([a], [b]) => a.localeCompare(b, "en"))),
    enums: Object.fromEntries([...enums].sort(([a], [b]) => a.localeCompare(b, "en"))),
  };
}

export function compareSnapshots(previous, current) {
  const changes = [];
  for (const group of ["definitions", "enums"]) {
    const before = previous?.[group] ?? {};
    const after = current[group];
    const names = new Set([...Object.keys(before), ...Object.keys(after)]);
    for (const name of names) {
      const oldEntries = Object.hasOwn(before, name) ? before[name] : [];
      const newEntries = Object.hasOwn(after, name) ? after[name] : [];
      const added = newEntries.filter(entry => !oldEntries.includes(entry));
      const removed = oldEntries.filter(entry => !newEntries.includes(entry));
      if (added.length || removed.length) {
        const automatic = group === "enums" && automaticEnums.has(name) &&
          oldEntries.length > 0 && removed.length === 0;
        changes.push({ name, added, removed, automatic });
      }
    }
  }
  return changes;
}

export function renderSuggestions(snapshot) {
  const lists = Object.entries(suggestionEnums).map(([option, [name, preferredOrder]]) => {
    const values = Object.hasOwn(snapshot.enums, name) ? snapshot.enums[name] : [];
    const ordered = preferredOrder.filter(value => values.includes(value))
      .concat(values.filter(value => !preferredOrder.includes(value)));
    return `  ${option}: Object.freeze([${ordered.map(value => JSON.stringify(value)).join(", ")}]),`;
  });
  return [
    "// Generated by scripts/webauthn-spec.mjs from spec/webauthn-4.json.",
    "export const webauthnSpecSuggestions = Object.freeze({",
    ...lists,
    "});",
    "",
  ].join("\n");
}

async function fetchPublishedSpec(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) {
    throw new Error(`W3C returned HTTP ${response.status} for ${url}.`);
  }
  return response.text();
}

async function prepareReference(previous, folder) {
  const latest = await fetchPublishedSpec(specUrl);
  const publication = readPublicationUrl(latest);
  const earlier = publication === previous.publication
    ? latest
    : await fetchPublishedSpec(previous.publication);
  const current = { publication, ...readSnapshot(latest) };
  const json = JSON.stringify(current, null, 2) + "\n";
  const changes = compareSnapshots(previous, current);
  const candidateAdditions = changes.length > 0 && changes.every(change => change.automatic);

  await mkdir(folder, { recursive: true });
  await Promise.all([
    writeFile(join(folder, "previous.txt"), readSpecReference(earlier) + "\n"),
    writeFile(join(folder, "current.txt"), readSpecReference(latest) + "\n"),
    writeFile(join(folder, "webauthn-4.json"), json),
    writeFile(join(folder, "webauthnSpecSuggestions.js"), renderSuggestions(current)),
  ]);
  console.log(`Checking ${publication} against ${previous.publication}.`);
  if (process.env.GITHUB_OUTPUT) {
    const digest = createHash("sha256").update(json).digest("hex").slice(0, 16);
    await appendFile(process.env.GITHUB_OUTPUT, [
      `publication=${publication}`,
      `digest=${digest}`,
      `candidate_additions=${candidateAdditions}`,
      "",
    ].join("\n"));
  }
}

async function main(args) {
  const previous = JSON.parse(await readFile(snapshotFile, "utf8"));
  if (!versionUrlPattern.test(previous.publication ?? "")) {
    throw new Error("The committed WebAuthn snapshot must identify a dated W3C publication.");
  }
  if (args.length === 1 && args[0] === "--check") {
    if (renderSuggestions(previous) !== await readFile(suggestionsFile, "utf8")) {
      throw new Error("WebAuthn suggestions do not match the committed spec snapshot.");
    }
    return;
  }
  if (args.length === 2 && args[0] === "--prepare") {
    await prepareReference(previous, args[1]);
    return;
  }
  throw new Error("Usage: node scripts/webauthn-spec.mjs --check | --prepare DIRECTORY");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main(process.argv.slice(2));
}
