const { sharedTheme } = require("./base");

const mobileFontFamily = {
  bold: "Aspekta-Bold",
  semiBold: "Aspekta-SemiBold",
  medium: "Aspekta-Medium",
  regular: "Aspekta-Regular",
};

const LINE_HEIGHT_BASE = 1.3;
const LINE_HEIGHT_BODY = 1.4;

const toPx = (value) => `${Number(value.toFixed(1))}px`;
const createTypography = (size, ratio) => [toPx(size), { lineHeight: toPx(size * ratio) }];

// NOTE: When adding new typography tokens, don't forget to update the TYPOGRAPHY_FONT_CLASS_MAP in Text.tsx
const mobileFontSize = {
  "28/title": createTypography(28, LINE_HEIGHT_BASE),
  "24/heading": createTypography(24, LINE_HEIGHT_BASE),
  "20/heading": createTypography(20, LINE_HEIGHT_BASE),
  "18/heading": createTypography(18, LINE_HEIGHT_BASE),
  "18/button": createTypography(18, LINE_HEIGHT_BASE),
  "16/button": createTypography(16, LINE_HEIGHT_BASE),
  "14/button": createTypography(14, LINE_HEIGHT_BASE),
  "16/body/emp": createTypography(16, LINE_HEIGHT_BODY),
  "16/body": createTypography(16, LINE_HEIGHT_BODY),
  "14/body/emp": createTypography(14, LINE_HEIGHT_BODY),
  "14/body": createTypography(14, LINE_HEIGHT_BODY),
  "12/body": createTypography(12, LINE_HEIGHT_BODY),
};

/**
 * Nativewind-safe preset for ui-mobile.
 * Keeps shared design tokens and removes web-only utilities.
 */
module.exports = {
  darkMode: "media",
  theme: {
    fontFamily: mobileFontFamily,
    fontSize: mobileFontSize,
    extend: {
      colors: sharedTheme.extend.colors,
    },
  },
  plugins: [],
};
