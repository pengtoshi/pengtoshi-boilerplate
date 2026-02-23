import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Input/Button",
  args: {
    label: "Continue",
    variant: "solid",
    size: "medium",
    disabled: false,
    loading: false,
  },
  argTypes: {
    onPress: {
      action: "pressed",
    },
  },
  decorators: [
    (Story) => (
      <View className="w-full max-w-[320px]">
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {};

export const Outlined: Story = {
  args: {
    variant: "outlinedPrimary",
    label: "Outlined",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    label: "Loading",
  },
};
