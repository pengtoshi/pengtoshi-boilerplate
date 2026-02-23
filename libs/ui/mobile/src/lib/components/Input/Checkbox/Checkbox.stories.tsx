import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "Input/Checkbox",
  args: {
    active: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const CheckboxExample = (args: Story["args"]) => {
  const [active, setActive] = useState(args?.active ?? false);
  return <Checkbox {...args} active={active} onChange={setActive} />;
};

export const Interactive: Story = {
  render: (args) => <CheckboxExample {...args} />,
};
