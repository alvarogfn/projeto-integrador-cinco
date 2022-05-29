import { StyleSheet, View } from "react-native";
import React from "react";
import { ActivityIndicator as PaperIndicator } from "react-native-paper";
import { colors } from "../utils/styles";

export default function ActivityIndicator() {
  return (
    <View style={{ flexGrow: 1, justifyContent: "center" }}>
      <PaperIndicator size={70} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({});
