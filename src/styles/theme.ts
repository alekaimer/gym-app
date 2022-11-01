import { extendTheme } from "native-base";

export const theme = extendTheme({
  colors: {
    grey: {
      950: "##09090a",
      900: "#121214",
      800: "#202024",
      600: "#323238",
      300: "#8d8d99",
      200: "#c4c4cc",
    },
    green: {
      500: "#047c3f",
    },
    yellow: {
      500: "#f9c74f",
      600: "#bba317",
    },
    red: {
      500: "#db4437",
    },
    white: "#FFFFFF",
  },

  fonts: {
    heading: "Roboto700Bold",
    body: "Roboto_400Regular",
    medium: "Roboto_500Medium",
  },

  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px",
  },

  sizes: {
    14: 56,
  },
});
