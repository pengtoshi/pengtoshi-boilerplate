import React, { type ComponentProps, useState } from "react";
import { Checkbox } from "./Checkbox";

const meta = {
  component: Checkbox,
  title: "Input/Checkbox",
  args: {
    active: false,
    disabled: false,
  },
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    onChange: {
      action: "changed",
    },
  },
};

export default meta;
const CheckboxExample = (args: ComponentProps<typeof Checkbox>) => {
  const [active, setActive] = useState(args?.active ?? false);
  return <Checkbox {...args} active={active} onChange={setActive} />;
};

export const Interactive = {
  render: (args: ComponentProps<typeof Checkbox>) => <CheckboxExample {...args} />,
};
