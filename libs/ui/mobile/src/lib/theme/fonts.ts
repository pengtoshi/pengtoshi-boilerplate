import type { FontSource } from "expo-font";
import { useFonts } from "expo-font";

export const UI_FONT_FAMILY = {
  sans: "Aspekta",
} as const;

export type UIMobileFontMap = Record<string, FontSource>;

/**
 * Aspekta is the default UI font family for mobile components.
 * The app should provide actual font assets via Expo font loading.
 */
export const useMobileFonts = (fonts: UIMobileFontMap) => {
  const [loaded, error] = useFonts(fonts);
  return { loaded, error };
};
