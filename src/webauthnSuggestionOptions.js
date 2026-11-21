import { webauthnSpecSuggestions } from "./webauthnSpecSuggestions.js";

export const webauthnSuggestionOptions = Object.freeze({
  ...webauthnSpecSuggestions,
  coseAlgorithms: Object.freeze([
    { value: "-7", label: "ES256" },
    { value: "-8", label: "EdDSA" },
    { value: "-35", label: "ES384" },
    { value: "-36", label: "ES512" },
    { value: "-37", label: "PS256" },
    { value: "-38", label: "PS384" },
    { value: "-39", label: "PS512" },
    { value: "-257", label: "RS256" },
    { value: "-258", label: "RS384" },
    { value: "-259", label: "RS512" },
  ]),
  boolean: Object.freeze(["true", "false"]),
});
