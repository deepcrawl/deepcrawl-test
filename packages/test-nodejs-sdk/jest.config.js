const jestConfigShared = require("../../jest.config.shared.js");

module.exports = {
  ...jestConfigShared,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/index.ts",
    "!<rootDir>/src/__tests__/**/*.ts",
    "!<rootDir>/src/**/*.test.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  roots: ["<rootDir>/src"],
};
