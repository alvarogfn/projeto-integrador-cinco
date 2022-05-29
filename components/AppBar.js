import React from "react";
import * as Paper from "react-native-paper";
import { StyleSheet } from "react-native";
import { colors } from "../utils/styles";

export default function AppBar({ navigation, title }) {
  return (
    <Paper.Appbar.Header style={styles.container}>
      <Paper.Appbar.Action
        icon={"menu"}
        onPress={() => navigation.openDrawer()}
        color={"#FFFFFF"}
      />
      <Paper.Appbar.Content title={title} titleStyle={styles.text} />
    </Paper.Appbar.Header>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.textWhite,
    fontWeight: "500",
    fontSize: 20,
    textTransform: "capitalize",
  },
});
