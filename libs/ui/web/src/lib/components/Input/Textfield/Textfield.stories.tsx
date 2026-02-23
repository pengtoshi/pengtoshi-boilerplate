import type { StoryFn } from "@storybook/react";
import { useState } from "react";
import type { ComponentProps } from "react";
import { TextField } from "./TextField";

export default { component: TextField };

const Template: StoryFn<ComponentProps<typeof TextField>> = (args: ComponentProps<typeof TextField>) => {
  const [value, setValue] = useState("");
  return <TextField {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  className: "w-[240px]",
  placeholder: "Enter text here",
};
