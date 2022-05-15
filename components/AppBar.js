import React from "react";
import * as Paper from "react-native-paper";
import { useTheme } from "react-native-paper";
import styles from "../utils/styles";

export default function AppBar({ navigation, title }) {
  const theme = useTheme();
  return (
    <Paper.Appbar.Header theme={theme} style={styles.appBarBackground}>
      <Paper.Appbar.Action
        icon={"menu"}
        onPress={() => navigation.openDrawer()}
        theme={theme}
        color={"#FFFFFF"}
      />
      <Paper.Appbar.Content
        title={title}
        theme={theme}
        titleStyle={styles.appBarText}
      />
    </Paper.Appbar.Header>
  );
}
