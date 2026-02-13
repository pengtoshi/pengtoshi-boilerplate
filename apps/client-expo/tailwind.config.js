/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset"), require("../../tailwind.preset")],
  content: [
    "./index.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../libs/ui/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

