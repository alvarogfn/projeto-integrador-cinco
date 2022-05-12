import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppBar from "../components/AppBar";

export default function Promotional({ navigation }) {
  return (
    <View>
      <AppBar title={"Promocional"} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({});
