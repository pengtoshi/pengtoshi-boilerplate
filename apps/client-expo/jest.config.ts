export default {
  displayName: "client-expo",
  preset: "../../jest.preset.js",
  setupFilesAfterEnv: ["<rootDir>/src/test-setup.ts"],
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/apps/client-expo",
};
