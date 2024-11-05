import type { StoryFn } from "@storybook/react";
import type { ComponentProps } from "react";
import type { ButtonProps } from "./Button";
import { Button } from "./Button";

export default { component: Button };

const OneItem: StoryFn<ComponentProps<typeof Button>> = (args) => <Button {...args} />;

const VariantList: StoryFn<ComponentProps<typeof Button>> = ({ variant, ...args }) => (
  <div className="flex flex-row gap-4">
    {(
      [undefined, "default", "destructive", "outline", "secondary", "ghost", "link"] as Array<ButtonProps["variant"]>
    ).map((targetVariant) => (
      <div className="flex flex-col gap-4" key={targetVariant}>
        <p className="text-14/body/m text-gray-600">{targetVariant ?? "default"}</p>
        <div className="flex flex-col gap-4">
          <Button {...args} variant={targetVariant ?? variant} />
          <Button {...args} variant={targetVariant ?? variant} disabled />
        </div>
      </div>
    ))}
  </div>
);

const SizeList: StoryFn<ComponentProps<typeof Button>> = ({ size, ...args }) => (
  <div className="flex flex-row gap-4">
    {([undefined, "default", "sm", "lg", "icon"] as Array<ButtonProps["size"]>).map((targetSize) => (
      <div className="flex flex-col gap-4" key={targetSize}>
        <p className="text-14/body/m text-gray-600">{targetSize ?? "default"}</p>
        <div className="flex flex-col gap-4">
          <Button {...args} size={targetSize ?? size} />
          <Button {...args} size={targetSize ?? size} disabled />
        </div>
      </div>
    ))}
  </div>
);

export const Default = OneItem.bind({});
Default.args = {
  type: "button",
  children: "Button",
};

export const Theme = VariantList.bind({});
Theme.args = {
  type: "button",
  children: "Button",
};

export const Size = SizeList.bind({});
Size.args = {
  type: "button",
  children: "Button",
};
