import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4173/webauthn-viewer/" },
  webServer: {
    command: "npm run build -- --outDir .playwright-build && npm exec vite -- preview --outDir .playwright-build --host localhost --port 4173 --strictPort",
    url: "http://localhost:4173/webauthn-viewer/",
    timeout: 120_000,
  },
});
