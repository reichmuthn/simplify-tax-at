const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["eslint:recommended", "prettier", "eslint-config-turbo"],
  plugins: ["only-warn", "react-hooks"],
  globals: {
    JSX: true,
    google: true
  },
  env: {
    browser: true,
    node: true
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  rules: {
    "no-restricted-exports": ["error", { "restrictDefaultExports": { "direct": true } }],
    "no-unused-vars": "off",
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "dist/",
  ],
  overrides: [
    { files: ["*.js?(x)", "*.ts?(x)"] },
    {
      files: ['src/app/**/{page,layout,not-found}.tsx'],
      rules: {
        'no-restricted-exports': 'off',
      },
    },
  ],
};
