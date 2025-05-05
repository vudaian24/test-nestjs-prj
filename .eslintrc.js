module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', "import", "jest"],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'pnpm-lock.yaml'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    "no-console": ["error", { "allow": ["warn", "error", "info"] }],
    "import/newline-after-import": ["error", { "count": 1 }],
    "import/order": [
      "warn",
      {
        "alphabetize": { "order": "asc", "caseInsensitive": true },
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "pathGroups": [
          {
            "pattern": "@nestjs/**",
            "group": "external",
            "position": "before"
          },
          { "pattern": "@src/**", "group": "internal", "position": "before" },
          {
            "pattern": "@modules/**",
            "group": "internal",
            "position": "before"
          },
          { "pattern": "@test/**", "group": "internal", "position": "before" }
        ],
        "newlines-between": "always"
      }
    ],
    "jest/no-conditional-expect": "error",
    "jest/prefer-to-be": "error",
    "jest/prefer-todo": "error",
  },
};
