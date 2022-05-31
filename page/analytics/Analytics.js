import { StyleSheet, View } from "react-native";
import React from "react";
import AppBar from "../../components/AppBar";

export default function Analytics({ navigation }) {
  return (
    <View>
      <AppBar title={"Métricas"} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({});
