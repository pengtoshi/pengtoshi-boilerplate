import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  framework: "@storybook/nextjs",
  stories: [
    {
      directory: "../apps/client-next/src",
      titlePrefix: "client-next",
      files: "**/*.stories.@(js|jsx|ts|tsx)",
    },
    {
      directory: "../libs/ui/web/src/lib",
      titlePrefix: "Web UI components",
      files: "**/*.stories.@(js|jsx|ts|tsx)",
    },
  ],
  staticDirs: ["../libs/ui/web/public"],
  addons: ["storybook-dark-mode", "@storybook/addon-essentials", "@nx/react/plugins/storybook"],
  webpackFinal: async (config, _options) => {
    // NOTE: This is a workaround to allow SVGs to be imported as React components.
    const rules = ((config.module?.rules ?? []) as any[]).slice();
    const removeSvgFromAssetRules = (ruleList: any[]) => {
      ruleList.forEach((rule) => {
        if (!rule || typeof rule !== "object") return;

        if (Array.isArray(rule.oneOf)) {
          removeSvgFromAssetRules(rule.oneOf);
        }

        if (rule.test instanceof RegExp && rule.test.test(".svg")) {
          rule.exclude = /\.svg$/i;
        }
      });
    };

    removeSvgFromAssetRules(rules);
    rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            exportType: "named",
            namedExport: "ReactComponent",
            icon: true,
            dimensions: false,
          },
        },
      ],
    });

    config.devtool = false;
    config.ignoreWarnings = [/Failed to parse source map/];
    config.resolve = {
      ...config.resolve,
    };
    config.module = {
      ...config.module,
      rules,
    };

    return config;
  },
  docs: {
    autodocs: true,
  },
};

export default config;
