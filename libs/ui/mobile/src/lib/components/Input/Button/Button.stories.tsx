import React, { type ComponentType } from "react";
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
    variant: {
      control: { type: "select" },
      options: ["solid", "outlinedPrimary", "outlinedAssertive", "textPrimary", "textAssertive"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large", "extraLarge"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    loading: {
      control: { type: "boolean" },
    },
    onPress: {
      action: "pressed",
    },
  },
  decorators: [
    (Story: ComponentType) => (
      <View style={{ width: "100%", maxWidth: 320 }}>
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
