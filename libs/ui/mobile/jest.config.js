module.exports = {
  displayName: "ui-mobile",
  preset: "jest-expo",
  moduleFileExtensions: ["ts", "js", "html", "tsx", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/src/test-setup.ts"],
  transform: {
    "\\.[jt]sx?$": [
      "babel-jest",
      {
        configFile: require.resolve("./babel.jest.config.js"),
      },
    ],
    "^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp|ttf|otf|m4v|mov|mp4|mpeg|mpg|webm|aac|aiff|caf|m4a|mp3|wav|html|pdf|obj)$":
      require.resolve("jest-expo/src/preset/assetFileTransformer.js"),
  },
  coverageDirectory: "../../../coverage/libs/ui/mobile",
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx,js,jsx}"],
  coveragePathIgnorePatterns: ["<rootDir>/src/index.ts"],
};
