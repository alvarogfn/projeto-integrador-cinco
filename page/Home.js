import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppBar from "../components/AppBar";
import { Drawer } from "react-native-paper";

export default function Home({ navigation }) {
  return (
    <View>
      <AppBar title={"Home"} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({});
