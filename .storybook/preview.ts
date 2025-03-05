import { Preview } from "@storybook/react";
import "react-toastify/dist/ReactToastify.css";
import "~/ui/public/styles/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    layout: "padded",
    controls: { expanded: true },
  },
};

export default preview;
