const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "\\.tsx?$": ["babel-jest", { configFile: "./babel-jest.config.js" }],
  },
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",

  // collectCoverage: true,
  // coverageDirectory: "coverage",
  // coverageProvider: "v8",
};

module.exports = createJestConfig(customJestConfig);
