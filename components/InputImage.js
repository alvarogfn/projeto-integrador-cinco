import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { colors } from "../utils/styles";
import TitleLabel from "./TitleLabel";

export default function InputImage({ onPress, ...props }) {
  return (
    <View style={styles.container}>
      <TitleLabel title={"Imagem"} />
      <Button
        onPress={onPress}
        {...props}
        theme={{
          colors: {
            primary: colors.primary,
            surface: colors.primary,
          },
        }}
        icon={"image"}
        mode={"outlined"}
        disabled={true}
        labelStyle={{ fontSize: 30, padding: 9.5 }}
      >
        <Text style={styles.text}>upload</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    padding: 30,
    fontSize: 15,
  },
});
