import type { StoryFn } from "@storybook/react";
import { type ComponentProps, useState } from "react";
import { TextArea } from "./TextArea";

export default { component: TextArea };

const Template: StoryFn<ComponentProps<typeof TextArea>> = (args: ComponentProps<typeof TextArea>) => {
  const [value, setValue] = useState("");
  return <TextArea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  className: "w-[360px] h-[240px]",
  placeholder: "Enter text here",
  maxLength: 200,
};
