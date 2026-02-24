import type { StorybookConfig } from "@storybook/react-native";

const config: StorybookConfig = {
  stories: [
    {
      directory: "../../../libs/ui/mobile/src/lib",
      titlePrefix: "Mobile UI components",
      files: "**/*.stories.@(js|jsx|ts|tsx)",
    },
  ],
  addons: ["@storybook/addon-ondevice-controls", "@storybook/addon-ondevice-actions"],
};

export default config;
