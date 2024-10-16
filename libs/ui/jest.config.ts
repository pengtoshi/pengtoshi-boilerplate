/* eslint-disable */
// FIXME: Add configuration after add storybook
export default {
  displayName: "ui",
  preset: "../../jest.preset.js",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "<rootDir>/../../coverage/libs/ui",
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx,js,jsx}"],
  coveragePathIgnorePatterns: ["<rootDir>/src/index.ts"],
  setupFiles: [],
  passWithNoTests: true,
};
