import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base JavaScript config (extends ESLint recommended rules)
  js.configs.recommended,

  // CommonJS support
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node, // enables `process`, `__dirname`, etc.
    },
  },

  // Jest-specific globals for test files
  {
    files: ["**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },

  // Ignore build/output directories
  {
    ignores: ["node_modules", "dist", "coverage"],
  },
]);
