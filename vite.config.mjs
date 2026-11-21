import { createRequire } from "node:module";
import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

const resolvePackage = createRequire(import.meta.url).resolve;
const nodeGlobals = { process: resolvePackage("process/browser") };

export default defineConfig({
  base: "/webauthn-viewer/",
  plugins: [vue(), legacy()],
  // CBOR uses Node streams internally, including when decoding synchronously.
  resolve: {
    alias: {
      buffer: resolvePackage("buffer/"),
      events: resolvePackage("events/"),
      stream: resolvePackage("stream-browserify"),
    },
  },
  optimizeDeps: { rolldownOptions: { transform: { inject: nodeGlobals } } },
  build: {
    outDir: "docs",
    sourcemap: true,
    rolldownOptions: { transform: { inject: nodeGlobals } },
  },
});
