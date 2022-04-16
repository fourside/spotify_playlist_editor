/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "\\.js$": "babel-jest",
    "\\.tsx?$": ["babel-jest", { configFile: "./.babelrc" }],
  },
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: ["/node_modules/(?!react-dnd)/"],
};

module.exports = customJestConfig;
