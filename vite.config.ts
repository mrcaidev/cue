/// <reference types="vitest" />

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [dts({ rollupTypes: true }), tsconfigPaths()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "cue",
      fileName: "index",
    },
  },
  test: {
    environment: "happy-dom",
    isolate: false,
    sequence: {
      concurrent: true,
    },
  },
});
