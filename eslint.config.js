import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-empty": "warn",
    },
  },
  {
    ignores: [
      "dist/",
      "node_modules/",
      "coverage/",
      "deps/",
      "quickstart/",
      "examples/",
      "eslint.config.js",
    ],
  }
);
