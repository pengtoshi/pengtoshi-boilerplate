import type { StoryFn } from "@storybook/react";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";
import type { ComponentProps } from "react";
import { ToggleIcon } from "./ToggleIcon";

export default { component: ToggleIcon };

const Template: StoryFn<ComponentProps<typeof ToggleIcon>> = (args: ComponentProps<typeof ToggleIcon>) => {
  const [active, setActive] = useState(false);
  return <ToggleIcon {...args} active={active} handleClick={() => setActive(!active)} />;
};

export const Default = Template.bind({});
Default.args = {
  icon: <DownloadIcon className="h-5 w-5 text-label-normal dark:text-dark-label-normal" />,
};
