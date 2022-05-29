import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button as PaperButton, Colors } from "react-native-paper";
import { colors } from "../utils/styles";

export default function Button({ onPress, children, padding = 5, icon }) {
  return (
    <PaperButton
      style={styles.container}
      mode="contained"
      icon={icon}
      onPress={onPress}
      labelStyle={{ ...styles.label }}
      theme={{
        colors: {
          text: Colors.white,
          primary: colors.primary,
        },
      }}
    >
      {children}
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  label: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.white,
  },
});
