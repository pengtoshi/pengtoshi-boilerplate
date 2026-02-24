module.exports = function uiMobileBabelConfig(api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo", "nativewind/babel"],
  };
};
