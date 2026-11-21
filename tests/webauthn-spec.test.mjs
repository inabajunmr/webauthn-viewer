import assert from "node:assert/strict";
import test from "node:test";
import { compareSnapshots, readSnapshot, renderSuggestions } from "../scripts/webauthn-spec.mjs";

function publishedIdl(idl) {
  return `
    <pre class="idl">dictionary Ignored {};</pre>
    <h2 id="idl-index">IDL Index</h2>
    <pre class="def idl">
      interface PublicKeyCredential {};
      dictionary PublicKeyCredentialCreationOptions {};
      dictionary PublicKeyCredentialRequestOptions {};
      ${idl}
    </pre>
    <h2>References</h2>
    <pre class="idl">dictionary AlsoIgnored {};</pre>
  `;
}

test("extracts the IDL Index and ignores comments and formatting", () => {
  const first = readSnapshot(publishedIdl('enum UserVerificationRequirement { "preferred", "required" };'));
  const second = readSnapshot(publishedIdl('enum UserVerificationRequirement{/* note */ "required", <a>"preferred"</a>};'));
  assert.deepEqual(second, first);
  assert.equal(Object.hasOwn(first.definitions, "Ignored"), false);
  assert.equal(Object.hasOwn(first.definitions, "AlsoIgnored"), false);
  assert.throws(() => readSnapshot("<h2>Contents</h2>"), /IDL Index was not found/);
  assert.throws(() => readSnapshot('<h2 id="idl-index">IDL Index</h2>'), /missing PublicKeyCredential/);
});

test("can apply an additive change to an existing suggestion list", () => {
  const previous = readSnapshot(publishedIdl('enum UserVerificationRequirement { "preferred", "required" };'));
  const current = readSnapshot(publishedIdl('enum UserVerificationRequirement { "preferred", "required", "test-value" };'));
  assert.deepEqual(compareSnapshots(previous, current), [
    { name: "UserVerificationRequirement", added: ["test-value"], removed: [], automatic: true },
  ]);
  assert.match(renderSuggestions(current), /userVerification: Object\.freeze\(\["required", "preferred", "test-value"\]\)/);
});

test("requires review for new fields, enum removals, and new enums", () => {
  const previous = readSnapshot(publishedIdl('enum UserVerificationRequirement { "preferred", "required" };'));
  const current = readSnapshot(publishedIdl(`
    partial dictionary PublicKeyCredentialRequestOptions { DOMString extra; };
    enum UserVerificationRequirement { "required" };
    enum AnotherEnum { "example" };
  `));
  const changes = compareSnapshots(previous, current);
  assert.equal(changes.length, 3);
  assert.ok(changes.every(change => !change.automatic));
  assert.ok(changes[0].added.includes("DOMString extra ;"));
});
