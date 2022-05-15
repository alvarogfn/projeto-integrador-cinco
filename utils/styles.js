import { StyleSheet } from "react-native";

const colors = {
  primary: "#ECBBAC",
  secondary: "#3A6450",
  textBlack: "#000000",
  textWhite: "#FFFFFF",
};

export default StyleSheet.create({
  appBarBackground: {
    backgroundColor: colors.primary,
  },
  appBarText: {
    color: colors.textWhite,
    fontWeight: "500",
    letterSpacing: "0.15px",
    fontSize: 20,
    textTransform: "capitalize",
  },
  button: {
    backgroundColor: colors.primary,
    margin: 5,
  },
  textButton: {
    color: colors.textWhite,
    fontWeight: 600,
    padding: 7.5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  centralize: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  snackBar: {
    backgroundColor: colors.secondary,
    color: "#FFFFFF",
    display: "flex",
    justifyContent: "space-between",
  },
  snackBarWrapper: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
  },
  serviceList: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  serviceListCard: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    borderRadius: 5,
    padding: 5,
  },
  listCardAvatar: {
    alignSelf: "center",
  },
  listTextContent: {
    color: "#000000",
  },
});

export { colors };
