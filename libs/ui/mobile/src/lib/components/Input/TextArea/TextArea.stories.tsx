import type { Meta, StoryObj } from "@storybook/react-native";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  title: "Input/TextArea",
  args: {
    placeholder: "Write something...",
    maxLength: 120,
    guide: "Max 120 characters",
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
