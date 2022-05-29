import { StyleSheet } from "react-native";
import React from "react";
import { colors } from "../utils/styles";
import { Subheading } from "react-native-paper";

export default function TitleLabel({ title }) {
  return <Subheading style={styles.title}>{title}</Subheading>;
}

const styles = StyleSheet.create({
  title: {
    color: colors.primary,
    fontWeight: "bold",
  },
});
