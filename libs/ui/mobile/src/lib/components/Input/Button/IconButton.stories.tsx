import type { Meta, StoryObj } from "@storybook/react-native";
import { Text, View } from "react-native";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: "Input/IconButton",
  args: {
    size: "medium",
    icon: <Text className="text-16/body">+</Text>,
    variant: "outlinedAssertive",
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

export const Default: Story = {};
