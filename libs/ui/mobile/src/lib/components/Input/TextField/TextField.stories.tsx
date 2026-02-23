import { TextField } from "./TextField";

const meta = {
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
export const Default = {};

export const WithError = {
  args: {
    error: "Invalid value",
  },
};
