import { TextArea } from "./TextArea";

const meta = {
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
export const Default = {};
