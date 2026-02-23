import type { Meta, StoryObj } from "@storybook/react-native";
import { PasswordField } from "./PasswordField";

const meta: Meta<typeof PasswordField> = {
  component: PasswordField,
  title: "Input/PasswordField",
  args: {
    placeholder: "Enter password",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
