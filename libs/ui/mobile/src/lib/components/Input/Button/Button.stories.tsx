import type { ComponentType } from "react";
import { View } from "react-native";
import { Button } from "./Button";

const meta = {
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
    (Story: ComponentType) => (
      <View className="w-full max-w-[320px]">
        <Story />
      </View>
    ),
  ],
};

export default meta;
export const Solid = {};

export const Outlined = {
  args: {
    variant: "outlinedPrimary",
    label: "Outlined",
  },
};

export const Loading = {
  args: {
    loading: true,
    label: "Loading",
  },
};
