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
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  roots: ["<rootDir>/src"],
};
