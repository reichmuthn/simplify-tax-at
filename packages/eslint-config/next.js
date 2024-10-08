const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    require.resolve("@vercel/style-guide/eslint/next"),
    "eslint-config-turbo",
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  rules: {
    "no-restricted-exports": ["error", { "restrictDefaultExports": { "direct": true } }],
  },
  plugins: ["only-warn"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
  ],
  overrides: [
    { files: ["*.js?(x)", "*.ts?(x)"] },
    {
      files: ['src/**/{page,layout,not-found,middleware,robots,manifest,sitemap}.ts?(x)'],
      rules: {
        'no-restricted-exports': 'off',
      },
    },
  ],
};
