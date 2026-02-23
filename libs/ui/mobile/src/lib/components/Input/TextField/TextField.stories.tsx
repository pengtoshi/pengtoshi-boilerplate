import type { Meta, StoryObj } from "@storybook/react-native";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  component: TextField,
  title: "Input/TextField",
  args: {
    placeholder: "Type here",
    guide: "Helper text",
  },
  argTypes: {
    onChangeText: {
      action: "changed",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: "Invalid value",
  },
};
