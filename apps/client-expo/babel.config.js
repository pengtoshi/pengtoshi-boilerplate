module.exports = function clientExpoBabelConfig(api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo", "nativewind/babel"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./src",
            "@libs/ui-mobile": "../../libs/ui/mobile/src/index.ts",
          },
          extensions: [".tsx", ".ts", ".js", ".json"],
        },
      ],
    ],
  };
};
