const { sharedTheme } = require("./base");

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("../../../tools/plugins/tailwind"), require("tailwindcss-animate")],
  safelist: [
    "after:pb-[50%]",
    "after:pb-[75%]",
    "after:pb-[100%]",
    "max-w-[none]",
    "max-h-[none]",
    "max-w-full",
    "max-h-full",
  ],
  darkMode: ["class"],
  theme: {
    ...sharedTheme,
    screens: {
      sm: "600px",
      md: "1024px",
      lg: "1440px",
      mx: "1800px",
    },
    extend: {
      ...sharedTheme.extend,
      boxShadow: {
        emphasize:
          "0px 2px 8px 0px rgba(0, 0, 0, 0.12), 0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)",
        toggle: "0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 3px 1px 0px rgba(0, 0, 0, 0.05)",
      },
      transitionProperty: {
        opacity: "opacity",
      },
      transitionDuration: {
        500: "300ms",
      },
      // add @shadcn/ui configuration below here
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
};
