module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/**/*.integration.ts", "!<rootDir>/src/**/*.test.ts"],
  coverageDirectory: "coverage",
  coverageReporters: ["html", "json", "text-summary"],
  globals: {
    "ts-jest": {
      diagnostics: false,
      isolatedModules: true,
    },
  },
  moduleFileExtensions: ["ts", "js"],
  preset: "ts-jest",
  roots: ["<rootDir>"],
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.integration.ts", "<rootDir>/src/**/*.test.ts"],
};
