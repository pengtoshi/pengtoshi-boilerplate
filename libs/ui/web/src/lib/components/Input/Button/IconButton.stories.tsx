import type { StoryFn } from "@storybook/react";
import { XIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { IconButton } from "./IconButton";
import { Icon } from "../../Icon/Icon";

export default { component: IconButton };

const Template: StoryFn<ComponentProps<typeof IconButton>> = (args: ComponentProps<typeof IconButton>) => {
  return (
    <div className="flex flex-row gap-4">
      <IconButton {...args} />
      <IconButton {...args} disabled />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  icon: <Icon component={XIcon} size={24} />,
};
