import type { StoryFn } from "@storybook/react";
import type { ComponentProps } from "react";
import { Toaster, showErrorToast, showInfoToast, showSuccessToast } from "./Toaster";
import { Button } from "../../Input/Button/Button";

export default { component: Toaster };

const Template: StoryFn<ComponentProps<typeof Toaster>> = () => (
  <div className="flex w-[240px] flex-col gap-4">
    <Button
      variant="outlinedPrimary"
      onClick={() => showSuccessToast("Hello", "This is toast description. This is toast description.")}
    >
      Show Success
    </Button>
    <Button
      variant="outlinedPrimary"
      onClick={() =>
        showErrorToast("Hello", "This is toast description. This is toast description. This is toast description.")
      }
    >
      Show Error
    </Button>
    <Button
      variant="outlinedPrimary"
      onClick={() =>
        showInfoToast(
          "Hello",
          "This is toast description. This is toast description. This is toast description. This is toast description.",
        )
      }
    >
      Show Info
    </Button>
  </div>
);

export const Default = Template.bind({});
