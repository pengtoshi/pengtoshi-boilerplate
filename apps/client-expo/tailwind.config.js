/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset"), require("../../libs/ui/tailwind/mobile.preset")],
  content: ["./index.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "../../libs/ui/mobile/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
