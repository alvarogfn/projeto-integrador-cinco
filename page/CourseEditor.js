import { StyleSheet, View, Text } from "react-native";
import React from "react";
import AppBarEditor from "../components/AppBarEditor";
import Input from "../components/Input";
import InputImage from "../components/InputImage";
import Button from "../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { BackHandler } from "react-native";

export default function CourseEditor({ navigation }) {
  const route = useRoute();
  useFocusEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.navigate(route.params.from);
      return true;
    });
    return () => {
      BackHandler.removeEventListener("hardwareBackPress");
    };
  });

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <AppBarEditor navigation={navigation} title={"Adicionar Novo Curso"} />
      <View style={styles.form}>
        <Input title={"Título"} placeholder={"Dê um nome ao Banner"} />
        <Input title={"Descrição"} numberOfLines={8} multiline={true} />
        <Input title={"Link de Redirecionamento"}></Input>
        <InputImage onPress={() => {}} />
      </View>
      <View style={styles.button}>
        <Button onPress={() => {}} mode={"contained"}>
          Adicionar
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  form: {
    padding: 5,
    margin: 10,
    flexGrow: 1,
  },
  button: {
    padding: 20,
  },
});
