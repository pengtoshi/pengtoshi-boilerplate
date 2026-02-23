import { useColorScheme } from "react-native";

export type UISystemColorScheme = "light" | "dark";

/**
 * Mobile-first dark mode strategy:
 * use the device appearance setting and keep a safe fallback.
 */
export const useSystemColorScheme = (): UISystemColorScheme => {
  return useColorScheme() ?? "light";
};
