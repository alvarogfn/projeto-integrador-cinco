import { StyleSheet } from "react-native";

const colors = {
  primary: "#ECBBAC",
  secondary: "#3A6450",
  textBlack: "#000000",
  textWhite: "#FFFFFF",
};

const helper = StyleSheet.create({
  appBarBackground: {
    backgroundColor: colors.primary,
  },
  appBarText: {
    color: colors.textWhite,
    fontWeight: "500",
    fontSize: 20,
    textTransform: "capitalize",
  },
  button: {
    backgroundColor: colors.primary,
    margin: 5,
  },
  textButton: {
    color: colors.textWhite,
    fontWeight: "600",
    padding: 7.5,
  },
  title: {
    fontWeight: "900",
    fontSize: 30,
    textAlign: "center",
    textTransform: "capitalize",
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
    width: "90%",
    maxHeight: "100%",
  },
  listCardAvatar: {
    alignSelf: "center",
  },
  borderTest: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#FF0000",
  },
});

export { colors, helper };
