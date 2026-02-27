const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const withStorybook = require("@storybook/react-native/metro/withStorybook");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

let config = getDefaultConfig(projectRoot);

config.watchFolders = [...(config.watchFolders ?? []), workspaceRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg");
config.resolver.sourceExts = [...config.resolver.sourceExts, "cjs", "mjs", "svg", "css"];

config = withNativeWind(config, { input: "./src/global.css" });

if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true") {
  config = withStorybook(config, {
    configPath: "./.rnstorybook",
    enabled: true,
    liteMode: true,
  });
}

config.transformer.unstable_allowRequireContext = true;

module.exports = config;
