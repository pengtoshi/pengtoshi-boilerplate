import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: "Input/Switch",
  args: {
    active: false,
    size: "medium",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SwitchExample = (args: Story["args"]) => {
  const [active, setActive] = useState(args?.active ?? false);
  return <Switch {...args} active={active} onChange={setActive} />;
};

export const Interactive: Story = {
  render: (args) => <SwitchExample {...args} />,
};
