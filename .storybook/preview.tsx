import { Preview } from "@storybook/react";
import { ThemeProvider, Toaster } from "@libs/ui";
import "~/ui/public/styles/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    layout: "padded",
    controls: { expanded: true },
  },
  decorators: [
    (Story) => {
      return (
        <ThemeProvider>
          <Toaster />
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
