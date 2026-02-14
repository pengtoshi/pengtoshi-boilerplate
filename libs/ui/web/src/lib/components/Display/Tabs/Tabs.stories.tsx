import type { StoryFn } from "@storybook/react";
import type { ComponentProps } from "react";
import { Tabs } from "./Tabs";

export default { component: Tabs };

const Template: StoryFn<ComponentProps<typeof Tabs>> = (args: ComponentProps<typeof Tabs>) => {
  return <Tabs {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  elements: [
    {
      label: "Account",
      value: "account",
      content: <div>Account content goes here</div>,
    },
    {
      label: "Password",
      value: "password",
      content: <div>Password content goes here</div>,
    },
    {
      label: "Settings",
      value: "settings",
      content: <div>Settings content goes here</div>,
    },
  ],
};
