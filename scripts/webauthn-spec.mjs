import { createHash } from "node:crypto";
import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parse as parseHtml } from "parse5";
import { parse as parseIdl, write as writeIdl } from "webidl2";

const specUrl = "https://www.w3.org/TR/webauthn-4/";
const specFolder = new URL("../spec/", import.meta.url);
const snapshotFile = new URL("webauthn-4.json", specFolder);
const suggestionsFile = new URL("../src/webauthnSpecSuggestions.js", import.meta.url);

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

function describeChanges(changes, autoMerge) {
  const lines = [`Web IDL changes in the [W3C WebAuthn Level 4 publication](${specUrl}#idl-index).`, ""];
  lines.push(autoMerge
    ? "This PR adds choices to existing request controls. The Chromium checks cover selection and request construction."
    : "This draft records changes that need an implementation review. Check the affected request controls and browser behavior before marking it ready.");
  lines.push("");
  for (const { name, added, removed } of changes.slice(0, 50)) {
    lines.push(`### ${name}`, "", "~~~~diff");
    lines.push(...removed.slice(0, 20).map(entry => `- ${entry}`));
    lines.push(...added.slice(0, 20).map(entry => `+ ${entry}`));
    if (removed.length > 20 || added.length > 20) {
      lines.push("  See the snapshot diff for the remaining entries.");
    }
    lines.push("~~~~", "");
  }
  if (changes.length > 50) {
    lines.push("See the snapshot diff for the remaining definitions.");
  }
  return lines.join("\n");
}

async function readOptional(file) {
  try {
    return await readFile(file, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}

async function fetchPublishedSpec() {
  const response = await fetch(specUrl, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) {
    throw new Error(`W3C returned HTTP ${response.status} for ${specUrl}.`);
  }
  return response.text();
}

async function main(args) {
  const previousJson = await readOptional(snapshotFile);
  const previous = previousJson ? JSON.parse(previousJson) : null;
  const previousSuggestions = await readOptional(suggestionsFile);
  if (args.length === 1 && args[0] === "--check") {
    if (!previous || renderSuggestions(previous) !== previousSuggestions) {
      throw new Error("WebAuthn suggestions do not match the committed spec snapshot.");
    }
    return;
  }
  if (args.length && !(args.length === 2 && args[0] === "--source")) {
    throw new Error(`Usage: node ${fileURLToPath(import.meta.url)} [--check | --source FILE]`);
  }

  const html = args.length ? await readFile(args[1], "utf8") : await fetchPublishedSpec();
  const current = readSnapshot(html);
  const json = JSON.stringify(current, null, 2) + "\n";
  const changes = compareSnapshots(previous, current);
  const changed = changes.length > 0;
  const suggestions = renderSuggestions(current);
  const suggestionsChanged = suggestions !== previousSuggestions;
  const autoMerge = changed && suggestionsChanged && changes.every(change => change.automatic);

  if (changed) {
    await mkdir(specFolder, { recursive: true });
    await writeFile(snapshotFile, json);
    if (suggestionsChanged) {
      await writeFile(suggestionsFile, suggestions);
    }
    console.log(describeChanges(changes, autoMerge));
  } else {
    console.log("The published WebAuthn Level 4 Web IDL matches the snapshot.");
  }
  if (process.env.GITHUB_OUTPUT) {
    const digest = createHash("sha256").update(json).digest("hex").slice(0, 16);
    await appendFile(process.env.GITHUB_OUTPUT, [
      `changed=${changed}`,
      `suggestions_changed=${suggestionsChanged}`,
      `auto_merge=${autoMerge}`,
      `digest=${digest}`,
      "",
    ].join("\n"));
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main(process.argv.slice(2));
}
