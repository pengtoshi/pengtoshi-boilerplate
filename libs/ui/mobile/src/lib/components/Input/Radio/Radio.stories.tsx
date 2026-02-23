import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { Radio } from "./Radio";

const meta: Meta<typeof Radio> = {
  component: Radio,
  title: "Input/Radio",
  args: {
    active: false,
    size: "medium",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const RadioExample = (args: Story["args"]) => {
  const [active, setActive] = useState(args?.active ?? false);
  return <Radio {...args} active={active} onChange={setActive} />;
};

export const Interactive: Story = {
  render: (args) => <RadioExample {...args} />,
};
