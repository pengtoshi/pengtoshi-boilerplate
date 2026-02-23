const { sharedTheme } = require("./base");

/**
 * Nativewind-safe preset for ui-mobile.
 * Keeps shared design tokens and removes web-only utilities.
 */
module.exports = {
  darkMode: "media",
  theme: {
    fontFamily: sharedTheme.fontFamily,
    fontSize: sharedTheme.fontSize,
    extend: {
      colors: sharedTheme.extend.colors,
    },
  },
  plugins: [],
};
