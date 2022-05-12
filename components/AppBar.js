import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Paper from "react-native-paper";

export default function AppBar({ navigation, title }) {
  return (
    <Paper.Appbar.Header>
      <Paper.Appbar.Action
        icon={"menu"}
        onPress={() => navigation.openDrawer()}
      />
      <Paper.Appbar.Content title={title} />
    </Paper.Appbar.Header>
  );
}

const styles = StyleSheet.create({});
