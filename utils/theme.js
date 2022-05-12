const fontConfig = {
  default: {
    // regular: {
    //   fontFamily: "roboto",
    //   fontWeight: "regular",
    // },
    medium: {
      fontFamily: "Roboto_500Medium",
      fontWeight: "medium",
    },
    // light: {
    //   fontFamily: "Lato-Light",
    //   fontWeight: "normal",
    // },
    // thin: {
    //   fontFamily: "Lato-Thin",
    //   fontWeight: "normal",
    // },
  },
};

fontConfig.ios = fontConfig.default;
fontConfig.android = fontConfig.default;

const theme = {
  ...DefaultTheme,
  colors: {
    primary: "#ECBBAC",
    accent: "#3A6450",
    text: "#99000000",
  },
  fonts: configureFonts(fontConfig),
};

export default theme;
