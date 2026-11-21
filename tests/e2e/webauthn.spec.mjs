import { expect, test } from "@playwright/test";
import { webauthnSpecSuggestions as suggestions } from "../../src/webauthnSpecSuggestions.js";

const credentialAction = (page, operation) =>
  page.getByRole("button", { name: `navigator.credentials.${operation}()`, exact: true });

function responseValue(page, field) {
  return page.getByRole("row").filter({
    has: page.getByRole("rowheader", { name: field, exact: true }),
  }).getByRole("cell").first();
}

async function selectSuggestion(input, value) {
  await input.click();
  await input.locator("..").getByRole("button", { name: value, exact: true }).click();
  await expect(input).toHaveValue(value);
}

async function captureOptions(page, operation) {
  await page.evaluate(operationName => {
    navigator.credentials[operationName] = async request => {
      window.capturedOptions = request.publicKey;
      throw new DOMException("Captured request for test", "AbortError");
    };
  }, operation);
}

async function submitAndReadOptions(page, operation) {
  await page.evaluate(() => { window.capturedOptions = null; });
  await credentialAction(page, operation).click();
  await expect.poll(() => page.evaluate(() => Boolean(window.capturedOptions))).toBe(true);
  return page.evaluate(() => window.capturedOptions);
}

test("registers and authenticates with a Chromium virtual authenticator", async ({ page, context }) => {
  const session = await context.newCDPSession(page);
  await session.send("WebAuthn.enable");
  await session.send("WebAuthn.addVirtualAuthenticator", {
    options: {
      protocol: "ctap2",
      transport: "internal",
      hasResidentKey: true,
      hasUserVerification: true,
      isUserVerified: true,
      automaticPresenceSimulation: true,
    },
  });
  await page.goto("./");
  await page.getByPlaceholder("none or direct or indirect or enterprise").fill("none");
  await page.getByPlaceholder("required or preferred or discouraged").first().fill("required");
  await credentialAction(page, "create").click();
  await expect(responseValue(page, ".id")).toHaveText(/^[\w-]+$/);
  await expect(responseValue(page, ".clientDataJSON")).toContainText("webauthn.create");
  const id = await responseValue(page, ".id").textContent();

  await page.getByRole("tab", { name: "get", exact: true }).click();
  await credentialAction(page, "get").click();
  await expect(responseValue(page, ".id")).toHaveText(id.trim());
  await expect(responseValue(page, ".clientDataJSON")).toContainText("webauthn.get");
  await expect(responseValue(page, ".signature")).toHaveText(/^[0-9a-f]+$/i);
});

test("passes each spec suggestion selected in the create form", async ({ page }) => {
  await page.goto("./");
  await captureOptions(page, "create");
  await page.getByRole("button", { name: "Add excludeCredentials", exact: true }).click();
  const roleOptions = page.getByPlaceholder("required or preferred or discouraged");
  const fields = [
    [page.getByPlaceholder("public-key").first(), suggestions.credentialTypes, options => options.pubKeyCredParams[0].type],
    [page.getByPlaceholder("public-key").nth(1), suggestions.credentialTypes, options => options.excludeCredentials[0].type],
    [page.getByPlaceholder("none or direct or indirect or enterprise"), suggestions.attestation, options => options.attestation],
    [page.getByPlaceholder("platform or cross-platform"), suggestions.authenticatorAttachment, options => options.authenticatorSelection.authenticatorAttachment],
    [roleOptions.first(), suggestions.residentKey, options => options.authenticatorSelection.residentKey],
    [roleOptions.nth(1), suggestions.userVerification, options => options.authenticatorSelection.userVerification],
  ];
  for (const [input, values, fieldValue] of fields) {
    for (const value of values) {
      await selectSuggestion(input, value);
      expect(fieldValue(await submitAndReadOptions(page, "create"))).toBe(value);
    }
  }

  for (const value of suggestions.hints) {
    await page.getByRole("checkbox", { name: value, exact: true }).last().check();
  }
  for (const value of suggestions.transports) {
    await page.getByRole("checkbox", { name: value, exact: true }).first().check();
  }
  const options = await submitAndReadOptions(page, "create");
  expect(options.hints).toEqual(suggestions.hints);
  expect(options.excludeCredentials[0].transports).toEqual(suggestions.transports);
});

test("passes each spec suggestion selected in the get form", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("tab", { name: "get", exact: true }).click();
  const panel = page.getByRole("tabpanel", { name: "get", exact: true });
  await captureOptions(page, "get");
  await page.getByRole("button", { name: "Add allowCredentials", exact: true }).click();
  for (const value of suggestions.credentialTypes) {
    await selectSuggestion(panel.getByPlaceholder("public-key"), value);
    const options = await submitAndReadOptions(page, "get");
    expect(options.allowCredentials[0].type).toBe(value);
  }
  for (const value of suggestions.userVerification) {
    await selectSuggestion(panel.getByPlaceholder("required or preferred or discouraged"), value);
    const options = await submitAndReadOptions(page, "get");
    expect(options.userVerification).toBe(value);
  }

  for (const value of suggestions.hints) {
    await page.getByRole("checkbox", { name: value, exact: true }).last().check();
  }
  for (const value of suggestions.transports) {
    await page.getByRole("checkbox", { name: value, exact: true }).first().check();
  }
  const options = await submitAndReadOptions(page, "get");
  expect(options.hints).toEqual(suggestions.hints);
  expect(options.allowCredentials[0].transports).toEqual(suggestions.transports);
});
