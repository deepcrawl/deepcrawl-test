module.exports = {
  env: {
    node: true,
  },
  extends: ["deepcrawl"],
  overrides: [
    {
      files: ["**/*.integration.ts", "**/*.mock.ts", "**/*.test.ts", "**/__tests__/**"],
      rules: {
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-magic-numbers": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/require-await": "off",
        "clean-code/feature-envy": "off",
        "node/no-unpublished-import": "off",
        "sonarjs/cognitive-complexity": "off",
        "sonarjs/no-duplicate-string": "off",
        "sonarjs/no-identical-functions": "off",
        "max-classes-per-file": "off",
        "max-lines-per-function": "off",
      },
    },
    {
      files: ["**/jest.config.js", "**/webpack.config.ts"],
      rules: {
        "node/no-unpublished-import": "off",
        "node/no-unpublished-require": "off",
      },
    },
    {
      files: ["**/bin/*.ts"],
      rules: {
        "no-process-exit": "off",
        "node/shebang": "off",
        "promise/prefer-await-to-then": "off",
      },
    },
  ],
  parserOptions: {
    createDefaultProgram: false,
    ecmaVersion: 2019,
    sourceType: "module",
  },
  root: true,
  reportUnusedDisableDirectives: true,
  rules: {
    "@typescript-eslint/naming-convention": "error",
    "jest/expect-expect": [
      "error",
      {
        assertFunctionNames: ["expect", "*.verify", "*.verifyAndRestore"],
      },
    ],
    "import/no-relative-parent-imports": "off",
  },
};
