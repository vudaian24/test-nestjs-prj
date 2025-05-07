const {
  defineConfig,
  globalIgnores,
} = require("eslint/config");

const tsParser = require("@typescript-eslint/parser");
const typescriptEslintEslintPlugin = require("@typescript-eslint/eslint-plugin");
const _import = require("eslint-plugin-import");
const jest = require("eslint-plugin-jest");

const {
  fixupPluginRules,
} = require("@eslint/compat");

const globals = require("globals");
const js = require("@eslint/js");

const {
  FlatCompat,
} = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = defineConfig([{
  files: ["**/*.ts"],
  languageOptions: {
    parser: tsParser,
    sourceType: "module",

    parserOptions: {
      project: "tsconfig.json",
      tsconfigRootDir: __dirname,
    },

    globals: {
      ...globals.node,
      ...globals.jest,
    },
  },

  plugins: {
    "@typescript-eslint": typescriptEslintEslintPlugin,
    import: fixupPluginRules(_import),
    jest,
  },

  extends: compat.extends("plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"),

  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",

    "no-console": ["error", {
      "allow": ["warn", "error", "info"],
    }],

    "import/newline-after-import": ["error", {
      "count": 1,
    }],

    "import/order": ["warn", {
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true,
      },

      "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],

      "pathGroups": [{
        "pattern": "@nestjs/**",
        "group": "external",
        "position": "before",
      }, {
        "pattern": "@src/**",
        "group": "internal",
        "position": "before",
      }, {
        "pattern": "@modules/**",
        "group": "internal",
        "position": "before",
      }, {
        "pattern": "@test/**",
        "group": "internal",
        "position": "before",
      }],

      "newlines-between": "always",
    }],

    "jest/no-conditional-expect": "error",
    "jest/prefer-to-be": "error",
    "jest/prefer-todo": "error",
    "@typescript-eslint/no-unused-vars": "error",
  },
}, globalIgnores(["**/.eslintrc.js", "**/pnpm-lock.yaml"])]);
