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
            "@libs/graphql-core": "../../libs/graphql/client/src/core/index.ts",
            "@libs/graphql-mobile": "../../libs/graphql/client/src/expo/index.ts",
          },
          extensions: [".tsx", ".ts", ".js", ".json"],
        },
      ],
    ],
  };
};
