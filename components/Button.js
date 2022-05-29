import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button as PaperButton, Colors } from "react-native-paper";
import { colors } from "../utils/styles";

export default function Button({ onPress, children, padding = 5 }) {
  return (
    <PaperButton
      style={styles.container}
      mode="contained"
      onPress={onPress}
      labelStyle={{ padding: padding, ...styles.text }}
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
  text: {
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.white,
  },
});
