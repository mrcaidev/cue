/// <reference types="vitest" />

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "cue",
      fileName: "index",
    },
  },
  test: {
    isolate: false,
    sequence: {
      concurrent: true,
    },
  },
});