import { DefaultTheme, configureFonts } from "react-native-paper";

const fontConfig = {
  default: {
    bold: {
      fontFamily: "Roboto",
      fontWeight: "900",
    },
    regular: {
      fontFamily: "Roboto",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "Roboto",
      fontWeight: "500",
    },
    light: {
      fontFamily: "Roboto",
      fontWeight: "200",
    },
    thin: {
      fontFamily: "Roboto",
      fontWeight: "100",
    },
  },
};

fontConfig.ios = fontConfig.default;
fontConfig.android = fontConfig.default;

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#ECBBAC",
    accent: "#3A6450",
    text: "#000000",
  },
  fonts: configureFonts(fontConfig),
};

export default theme;
