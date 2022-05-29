import { StyleSheet, View, Alert } from "react-native";
import React from "react";
import AppBarEditor from "../components/AppBarEditor";
import Input from "../components/Input";
import InputImage from "../components/InputImage";
import Button from "../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { UserContext } from "../Context";

export default function CourseEditor({ navigation, route }) {
  const [form, setForm] = React.useState({});
  const { course } = React.useContext(UserContext);

  useFocusEffect(function backActionHandler() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.navigate(route.params.from);
      return true;
    });
    return () => {
      BackHandler.removeEventListener("hardwareBackPress");
    };
  });

  React.useEffect(() => {
    const id = route?.params?.courseId;
    console.log(id);
    if (id)
      course.get(id).then(
        (r) => setForm((state) => Object.assign({}, r)),
        (err) => Alert.alert("Um erro aconteceu", err.toString())
      );
  }, [route, setForm]);

  function handleForm(object) {
    setForm((state) => Object.assign({}, state, object));
  }

  function checkForm() {
    const { title, description, redirect } = form;
    if (!title || !description || !redirect) {
      if (!title) handleForm({ title: "" });
      if (!description) handleForm({ description: "" });
      if (!redirect) handleForm({ redirect: "" });
      Alert.alert("Preencha todos os campos!");
      return;
    }

    Alert.alert(`Adicionar o curso ${form.title}?`, "", [
      {
        text: "Não",
        onPress: () => {},
      },
      {
        text: "Sim",
        onPress: handleSubmit,
      },
    ]);
  }

  async function handleSubmit() {
    try {
      if (form.id) course.put(form, form.id);
      else course.post(form);
      navigation.navigate("Courses", {
        snackMessage: `Curso ${form.title} foi adicionado com sucesso!`,
      });
    } catch (e) {
      Alert.alert("Um erro aconteceu", err.toString());
    }
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <AppBarEditor navigation={navigation} title={"Adicionar Novo Curso"} />
      <View style={styles.form}>
        <Input
          title={"Título"}
          isError={form.title === ""}
          errorMessage={"Esse campo é obrigatório"}
          value={form.title}
          onChangeText={(value) => handleForm({ title: value })}
        />
        <Input
          title={"Descrição"}
          isError={form.description === ""}
          errorMessage={"Esse campo é obrigatório"}
          value={form.description}
          onChangeText={(value) => handleForm({ description: value })}
          numberOfLines={8}
          multiline={true}
        />
        <Input
          title={"Link de Redirecionamento"}
          isError={form.redirect === ""}
          value={form.redirect}
          errorMessage={"Esse campo é obrigatório"}
          onChangeText={(value) => handleForm({ redirect: value })}
        ></Input>
        <InputImage onPress={() => {}} />
      </View>
      <View style={styles.button}>
        <Button onPress={checkForm} mode={"contained"}>
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
