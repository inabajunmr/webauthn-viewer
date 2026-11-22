# webauthn-viewer

WebAuthn response viewer for learning.

https://inabajunmr.github.io/webauthn-viewer/

![image](image.gif)

## Project setup

Use Node.js 20.19+ (20.x), 22.13+ (22.x), or 24+.

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lint
```
npm run lint
```

## WebAuthn Level 4 updates

The **Review WebAuthn Level 4 with Codex** workflow runs on the first Monday of each month at 09:23 Japan time. Codex compares the [latest W3C publication](https://www.w3.org/TR/webauthn-4/) with the publication recorded in `spec/webauthn-4.json`. It reviews the Web IDL and specification text, then proposes application changes, tests, and the rebuilt `docs/` files when an update applies to the viewer.

The workflow opens a PR for a proposed viewer change and runs lint, spec tests, and Chromium tests on that commit. Additions confined to the generated suggestion lists can merge automatically after CI, followed by a GitHub Pages build request. Other implementation changes open draft PRs for review.

Set the repository Actions secret `OPENAI_API_KEY` for Codex. The GitHub Actions setting **Allow GitHub Actions to create and approve pull requests** enables PR creation. Use **Run workflow** for an on-demand Codex review and turn on **publish** to let it open a PR. To run the checks locally:

```sh
npm run test:spec
npx playwright install chromium
npm run test:e2e
```
