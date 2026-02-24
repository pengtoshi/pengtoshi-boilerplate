import type { StoryFn } from "@storybook/react";
import type { ComponentProps, ReactNode } from "react";
import { DropdownMenu } from "./DropdownMenu";

export default {
  component: DropdownMenu,
};

const Template: StoryFn<ComponentProps<typeof DropdownMenu>> = (args: ComponentProps<typeof DropdownMenu>) => {
  return <DropdownMenu {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  menuLabel: "Actions",
  items: [
    {
      label: "Edit",
      onClick: () => {},
    },
    {
      label: "Duplicate",
      onClick: () => {},
    },
    {
      label: "Delete",
      onClick: () => {},
    },
  ],
};

const CustomTrigger = ({ children }: { children: ReactNode }) => <button type="button">{children}</button>;

export const WithCustomTrigger = Template.bind({});
WithCustomTrigger.args = {
  trigger: <CustomTrigger>Open menu</CustomTrigger>,
  items: [
    {
      label: "Enable",
      onClick: () => {},
    },
    {
      label: "Disable",
      onClick: () => {},
    },
  ],
};
