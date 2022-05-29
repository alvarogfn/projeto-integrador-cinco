import { View, StyleSheet, Alert } from "react-native";
import React from "react";
import Input from "../components/Input";
import { Masks, formatWithMask } from "react-native-mask-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppBarEditor from "../components/AppBarEditor";
import InputImage from "../components/InputImage";
import Button from "../components/Button";
import { UserContext } from "../Context";
import ActivityIndicator from "../components/ActivityIndicator";

export default function ServiceEditor({ navigation, route }) {
  const [form, setForm] = React.useState({});
  const { service } = React.useContext(UserContext);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      if (typeof route?.params?.serviceId === "string") {
        setLoading(true);
        service
          .get(route.params.serviceId)
          .then(
            (res) => setForm(res),
            (err) => Alert.alert("Um erro aconteceu", err.toString())
          )
          .then(() => setLoading(false));

        return;
      }
      setForm({});
    } catch (e) {}
  }, [route, setForm]);

  function onChangeForm(object) {
    if (object.phone) {
      const { unmasked } = formatWithMask({
        text: object.phone,
        mask: Masks.BRL_PHONE,
      });
      setForm((previous) => Object.assign({}, previous, { phone: unmasked }));
    }

    setForm((previous) => Object.assign({}, previous, object));
  }

  async function handleSubmit() {
    try {
      const { name, price, description, phone } = form;
      if (!name || !price || !description || !phone) {
        if (!name) onChangeForm({ name: "" });
        if (!price) onChangeForm({ price: "" });
        if (!description) onChangeForm({ description: "" });
        if (!phone) onChangeForm({ phone: "" });

        Alert.alert("Campos faltando", "Preencha os campos obrigatórios");
        return;
      }

      if (form.id) await service.put(form, form.id);
      else await service.post(form);

      navigation.navigate("Services", {
        snackbar: {
          title: form.name,
          description: form.id
            ? "Você editou com sucesso!"
            : "Você adicionou um novo serviço com sucesso!",
        },
      });
    } catch (e) {
      Alert.alert("Error", e.toString());
    }
  }

  async function handleDelete() {
    try {
      Alert.alert(`Deletar ${form.name}?`, "Essa ação é irreversível!!!", [
        { text: "Não", onPress: () => {}, style: "cancel" },
        {
          text: "Sim",
          onPress: async () => {
            await service.delete(form.id);
            navigation.navigate("Services", {
              snackbar: {
                title: `${form.name} foi deletado com sucesso!`,
              },
            });
          },
          style: "destructive",
        },
      ]);
    } catch (e) {
      Alert.alert("Um erro aconteceu", e.toString());
    }
  }

  return (
    <React.Fragment>
      {form.id ? (
        <AppBarEditor
          navigation={navigation}
          title={"Editando Produto"}
          id={form.id}
          icon={"delete"}
          handleIcon={handleDelete}
        />
      ) : (
        <AppBarEditor
          navigation={navigation}
          title={"Novo serviço"}
          id={form.id}
          icon={"content-save"}
          handleIcon={handleSubmit}
        />
      )}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <KeyboardAwareScrollView style={styles.container}>
          <Input
            title={"Nome"}
            value={form.name}
            isError={form.name === ""}
            errorMessage="Campo obrigatório"
            onChangeText={(text) => onChangeForm({ name: text })}
          />
          <Input
            title="Descrição"
            value={form.description}
            isError={form.description === ""}
            errorMessage="Campo obrigatório"
            onChangeText={(text) => onChangeForm({ description: text })}
            multiline={true}
            numberOfLines={6}
          />
          <Input
            title="Preço"
            placeholder="R$ 0,00"
            value={form.price}
            isError={form.price === ""}
            errorMessage="Campo obrigatório"
            onChangeText={(text) => onChangeForm({ price: text })}
            mask={Masks.BRL_CURRENCY}
            icon={"currency-brl"}
          />
          <InputImage title="Imagem" />
          <Input
            title="Número"
            placeholder="(00) 00000-0000"
            isError={form.phone === ""}
            errorMessage="Campo obrigatório"
            value={form.phone}
            onChangeText={(text) => onChangeForm({ phone: text })}
            mask={Masks.BRL_PHONE}
            icon={"phone"}
          />
          <View style={styles.button}>
            <Button onPress={handleSubmit}>
              {form.id ? "Editar" : "Salvar"}
            </Button>
          </View>
        </KeyboardAwareScrollView>
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  button: {
    margin: 30,
  },
});
