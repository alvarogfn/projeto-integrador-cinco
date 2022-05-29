import { StyleSheet } from "react-native";
import React from "react";
import { FAB as PaperFAB } from "react-native-paper";
import { colors } from "../utils/styles";

export default function FAB({ icon, onPress }) {
  return (
    <PaperFAB
      style={styles.FAB}
      icon={icon}
      color={"#ffffff"}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  FAB: {
    backgroundColor: colors.primary,
    position: "absolute",
    right: 10,
    bottom: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
