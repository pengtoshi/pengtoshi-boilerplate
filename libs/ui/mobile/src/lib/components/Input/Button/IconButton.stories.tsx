import { Plus } from "lucide-react-native";
import type { ComponentType } from "react";
import { View } from "react-native";
import { IconButton } from "./IconButton";

const meta = {
  component: IconButton,
  title: "Input/IconButton",
  args: {
    icon: <Plus size={18} color="#1F1F1F" />,
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
export const Default = {};
