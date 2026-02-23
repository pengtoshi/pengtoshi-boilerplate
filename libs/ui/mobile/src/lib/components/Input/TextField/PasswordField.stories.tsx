import { DEFAULT_PASSWORD_RULES, PasswordField } from "./PasswordField";

const meta = {
  component: PasswordField,
  title: "Input/PasswordField",
  args: {
    placeholder: "Enter password",
    guide: "Use at least 8 characters",
    hiddenByDefault: true,
    rules: DEFAULT_PASSWORD_RULES,
  },
  argTypes: {
    guide: {
      control: { type: "text" },
    },
    rules: {
      control: { type: "object" },
    },
    isError: {
      control: { type: "boolean" },
    },
    errorGuide: {
      control: { type: "text" },
    },
    hiddenByDefault: {
      control: { type: "boolean" },
    },
    onChangeText: {
      action: "changed",
    },
  },
};

export default meta;
export const Default = {};

export const WithError = {
  args: {
    isError: true,
    errorGuide: "Invalid password",
  },
};
