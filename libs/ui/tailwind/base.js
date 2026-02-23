const { fontFamily } = require("tailwindcss/defaultTheme");

const colors = {
  backdrop: "#3C3C4330",
  normal: "#FAFAFA",
  label: {
    normal: "#1F1F1F",
    assertive: "#6F6F6F",
    placeholder: "#A8A8A8",
    disabled: "#B8B8B8",
  },
  background: {
    strong: "#F4F4F4",
    disabled: "#E0E0E0",
  },
  line: {
    normal: "#C6C6C6",
  },
  primary: {
    transparent: "#B571BB30",
    normal: "#B571BB",
    strong: "#89518E",
    deg: "#DB9DDF",
  },
  secondary: {
    transparent: "#73C07D30",
    normal: "#73C07D",
    strong: "#43954E",
    deg: "#8DCE8F",
  },
  status: {
    positive: "#00BF40",
    cautionary: "#FF9200",
    negative: "#FF4242",
  },
  dark: {
    backdrop: "#3C3C4330",
    normal: "#1F1F1F",
    label: {
      normal: "#F4F4F4",
      assertive: "#A8A8A8",
      placeholder: "#6F6F6F",
      disabled: "#636363",
    },
    line: {
      normal: "#525252",
    },
    background: {
      strong: "#262626",
      disabled: "#393939",
    },
    primary: {
      transparent: "#9A5AA130",
      normal: "#9A5AA1",
      strong: "#D9B4DD",
      deg: "#6B2F72",
    },
    secondary: {
      transparent: "#5FBF7330",
      normal: "#5FBF73",
      strong: "#9FE0AA",
      deg: "#2F6F3D",
    },
    status: {
      positive: "#33D96D",
      cautionary: "#FFB347",
      negative: "#FF7575",
    },
  },
};

const sharedTheme = {
  fontFamily: {
    sans: ["Aspekta", ...fontFamily.sans],
  },
  fontSize: {
    "28/title": ["28px", { fontWeight: 600, lineHeight: "130%" }],
    "24/heading": ["24px", { fontWeight: 600, lineHeight: "130%" }],
    "20/heading": ["20px", { fontWeight: 600, lineHeight: "130%" }],
    "18/heading": ["18px", { fontWeight: 600, lineHeight: "130%" }],
    "18/button": ["18px", { fontWeight: 500, lineHeight: "130%" }],
    "16/button": ["16px", { fontWeight: 500, lineHeight: "130%" }],
    "14/button": ["14px", { fontWeight: 500, lineHeight: "130%" }],
    "16/body/emp": ["16px", { fontWeight: 500, lineHeight: "140%" }],
    "16/body": ["16px", { fontWeight: 400, lineHeight: "140%" }],
    "14/body/emp": ["14px", { fontWeight: 500, lineHeight: "140%" }],
    "14/body": ["14px", { fontWeight: 400, lineHeight: "140%" }],
    "12/body": ["12px", { fontWeight: 400, lineHeight: "140%" }],
  },
  extend: {
    colors,
  },
};

module.exports = {
  colors,
  sharedTheme,
};
