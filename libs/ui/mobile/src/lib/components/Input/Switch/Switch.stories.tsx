import React, { type ComponentProps, useState } from "react";
import { Switch } from "./Switch";

const meta = {
  component: Switch,
  title: "Input/Switch",
  args: {
    active: false,
    size: "medium",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
    },
  },
};

export default meta;
const SwitchExample = (args: ComponentProps<typeof Switch>) => {
  const [active, setActive] = useState(args?.active ?? false);
  return <Switch {...args} active={active} onChange={setActive} />;
};

export const Interactive = {
  render: (args: ComponentProps<typeof Switch>) => <SwitchExample {...args} />,
};
