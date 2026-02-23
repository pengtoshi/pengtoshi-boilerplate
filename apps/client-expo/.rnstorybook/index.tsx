import { view } from "./storybook.requires";
import "../src/global.css";

const storybookStorage = {
  getItem: async (key: string): Promise<string | null> => {
    if (typeof window === "undefined" || typeof window.localStorage === "undefined") {
      return null;
    }
    return window.localStorage.getItem(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (typeof window === "undefined" || typeof window.localStorage === "undefined") {
      return;
    }
    window.localStorage.setItem(key, value);
  },
};

const StorybookUIRoot = view.getStorybookUI({
  onDeviceUI: true,
  shouldPersistSelection: false,
  storage: storybookStorage,
  initialSelection: {
    kind: "Mobile UI components/Input/Button",
    name: "Solid",
  },
});

export default StorybookUIRoot;
