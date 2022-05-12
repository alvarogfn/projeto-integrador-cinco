import { StyleSheet, View } from "react-native";
import React from "react";
import AppBar from "../components/AppBar";

export default function Services({ navigation }) {
  return (
    <View>
      <AppBar title="Serviços" navigation={navigation}></AppBar>
    </View>
  );
}

const styles = StyleSheet.create({});
