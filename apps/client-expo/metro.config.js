const path = require("path");
const { getDefaultConfig } = require("@expo/metro-config");
const withStorybook = require("@storybook/react-native/metro/withStorybook");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
const workspaceRoot = path.resolve(__dirname, "../..");

// Allow Metro to resolve workspace libraries (e.g. @libs/ui-mobile) in monorepo.
config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
config.transformer.unstable_allowRequireContext = true;
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg");
config.resolver.sourceExts = [...config.resolver.sourceExts, "cjs", "mjs", "svg", "css"];

const nativewindConfig = withNativeWind(config, { input: "./src/global.css" });

module.exports = withStorybook(nativewindConfig, {
  configPath: "./.rnstorybook",
  enabled: process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true",
  liteMode: true,
});
