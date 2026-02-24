import type { StoryFn } from "@storybook/react";
import type { ComponentProps } from "react";
import { Avatar } from "./Avatar";

export default {
  component: Avatar,
};

const Template: StoryFn<ComponentProps<typeof Avatar>> = (args: ComponentProps<typeof Avatar>) => {
  return <Avatar {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  seed: "liquidity-manager",
};

export const WithRing = Template.bind({});
WithRing.args = {
  seed: "liquidity-manager-ring",
  className: "ring-2 ring-primary-normal shadow-emphasize",
};
