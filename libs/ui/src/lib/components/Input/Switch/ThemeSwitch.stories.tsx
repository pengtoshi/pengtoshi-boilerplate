import type { StoryFn } from "@storybook/react";
import type { ComponentProps } from "react";
import { ThemeSwitch } from "./ThemeSwitch";

export default { component: ThemeSwitch };

const Template: StoryFn<ComponentProps<typeof ThemeSwitch>> = (args: ComponentProps<typeof ThemeSwitch>) => {
  return <ThemeSwitch {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  size: "medium",
};
