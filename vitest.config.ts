import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  test: {
    globals: true,
    include: ["**/*.spec.ts"],
    alias: {
      "@": resolve(__dirname, "src"),
      "@spec": resolve(__dirname, "test"),
    },
    root: "./",
    coverage: {
      reporter: ["text"],
    },
  },
});
