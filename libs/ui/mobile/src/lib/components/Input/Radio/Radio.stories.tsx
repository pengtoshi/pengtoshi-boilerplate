import React, { type ComponentProps, useState } from "react";
import { Radio } from "./Radio";

const meta = {
  component: Radio,
  title: "Input/Radio",
  args: {
    active: false,
    size: "medium",
    disabled: false,
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    onChange: {
      action: "changed",
    },
  },
};

export default meta;
const RadioExample = (args: ComponentProps<typeof Radio>) => {
  const [active, setActive] = useState(args?.active ?? false);
  return <Radio {...args} active={active} onChange={setActive} />;
};

export const Interactive = {
  render: (args: ComponentProps<typeof Radio>) => <RadioExample {...args} />,
};
