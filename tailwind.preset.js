const { fontFamily } = require("tailwindcss/defaultTheme");

const colors = {
  gray: {
    0: "#ffffff",
    10: "#f4f4f4",
    50: "#fafafa",
    100: "#f4f4f4",
    150: "#ebebeb",
    200: "#e0e0e0",
    250: "#d6d6d6",
    300: "#c6c6c6",
    350: "#b8b8b8",
    400: "#a8a8a8",
    450: "#9c9c9c",
    500: "#8d8d8d",
    550: "#808080",
    600: "#6f6f6f",
    650: "#636363",
    700: "#525252",
    750: "#4a4a4a",
    800: "#393939",
    850: "#333333",
    900: "#262626",
    950: "#1f1f1f",
    1000: "#000000",
  },
  etc: {
    positive: "#3DBE62",
    positiveDeg: "#A7F0BA",
    negative: "#FF2C52",
    negativeDeg: "#FF9EB0",
  },
  // add @shadcn/ui configuration below here
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("./tools/plugins/tailwind"), require("tailwindcss-animate")],
  safelist: [
    "after:pb-[50%]",
    "after:pb-[75%]",
    "after:pb-[100%]",
    "max-w-[none]",
    "max-h-[none]",
    "max-w-full",
    "max-h-full",
  ],
  theme: {
    screens: {
      sm: "600px",
      md: "1024px",
      lg: "1440px",
      mx: "1800px",
    },
    fontFamily: {
      sans: ["IBM Plex Sans", ...fontFamily.sans],
    },
    fontSize: {
      "60/landing": ["60px", { fontWeight: 600, lineHeight: "130%" }],
      "36/landing": ["36px", { fontWeight: 600, lineHeight: "130%" }],
      "28/title": ["28px", { fontWeight: 600, lineHeight: "130%" }],
      "24/heading/l": ["24px", { fontWeight: 600, lineHeight: "130%" }],
      "20/heading/m": ["20px", { fontWeight: 600, lineHeight: "130%" }],
      "18/heading/s": ["18px", { fontWeight: 600, lineHeight: "130%" }],
      "18/heading/logo": ["18px", { fontWeight: 400, lineHeight: "130%", letterSpacing: "-5%" }],
      "16/button/l": ["16px", { fontWeight: 500, lineHeight: "130%" }],
      "14/button/m": ["14px", { fontWeight: 500, lineHeight: "130%" }],
      "16/body/l/emp": ["16px", { fontWeight: 500, lineHeight: "140%" }],
      "16/body/l": ["16px", { fontWeight: 400, lineHeight: "140%" }],
      "14/body/m/emp": ["14px", { fontWeight: 500, lineHeight: "140%" }],
      "14/body/m": ["14px", { fontWeight: 400, lineHeight: "140%" }],
      "14/body/s/emp": ["14px", { fontWeight: 500, lineHeight: "140%" }],
      "12/body/s": ["12px", { fontWeight: 400, lineHeight: "140%" }],
    },
    extend: {
      boxShadow: {
        toggle: "0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 3px 1px 0px rgba(0, 0, 0, 0.05)",
      },
      colors: {
        ...colors,
        theme: {
          white: colors.gray[0],
          black: colors.gray[1000],
        },
      },
      transitionProperty: {
        opacity: "opacity",
      },
      transitionDuration: {
        500: "300ms",
      },
      // add @shadcn/ui configuration below here
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
};
