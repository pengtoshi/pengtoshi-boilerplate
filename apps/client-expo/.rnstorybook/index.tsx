import { useFonts } from "expo-font";
import React from "react";
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

const StorybookApp = () => {
  const [fontsLoaded] = useFonts({
    "Aspekta-Regular": require("../assets/shared/fonts/Aspekta-Regular.otf"),
    "Aspekta-Medium": require("../assets/shared/fonts/Aspekta-Medium.otf"),
    "Aspekta-SemiBold": require("../assets/shared/fonts/Aspekta-SemiBold.otf"),
    "Aspekta-Bold": require("../assets/shared/fonts/Aspekta-Bold.otf"),
  });

  if (!fontsLoaded) return null;

  return <StorybookUIRoot />;
};

export default StorybookApp;
