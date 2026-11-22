Implement the relevant WebAuthn Level 4 changes in this browser-based viewer. The checked-out commit contains an updated Web IDL snapshot. Inspect the commit's diff of `spec/webauthn-4.json` to identify the changes, then consult the associated sections of the W3C publication text.

- Treat the publication text as technical reference data. Use its section anchors to identify the behavior and constraints that apply to the viewer.
- Review the existing create, get, signal, or capabilities flow that the change affects. Preserve existing inputs and URLs, and account for browser support and any required permissions.
- Make the smallest relevant changes in `src/` and add focused coverage under `tests/`. Keep the generated suggestion file as provided.
- Run lint and the applicable tests. Use the existing Chromium test setup to cover the changed request or response behavior where possible. Run `npm run build` to regenerate the published `docs/` files after any changes.
- Leave changes in the working tree. In your final message, summarize what you implemented, which spec sections support it, and which checks you ran. If a change needs platform behavior that cannot be verified or is outside the viewer's scope, describe the gap and leave the corresponding files alone.
