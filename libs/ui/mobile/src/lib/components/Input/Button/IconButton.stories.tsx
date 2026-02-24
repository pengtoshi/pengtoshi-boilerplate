import { Plus } from "lucide-react-native";
import React, { type ComponentType } from "react";
import { View } from "react-native";
import { IconButton } from "./IconButton";

const meta = {
  component: IconButton,
  title: "Input/IconButton",
  args: {
    icon: <Plus size={18} color="#1F1F1F" />,
    size: "medium",
    disabled: false,
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    disabled: {
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
export const Default = {};
