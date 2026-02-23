const path = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("../tailwind/mobile.preset")],
  content: [path.join(__dirname, "src/**/*.{js,jsx,ts,tsx}")],
  plugins: [],
};
