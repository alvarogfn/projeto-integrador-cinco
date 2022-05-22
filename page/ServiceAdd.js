import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Input from "../components/Input";
import { Appbar, Button, Snackbar } from "react-native-paper";
import mainStyles, { colors } from "../utils/styles";
import { Masks, formatWithMask } from "react-native-mask-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Dialog from "../components/Dialog";
import { useFocusEffect } from "@react-navigation/native";

export default function ServiceAdd({ navigation, route }) {
  const [serviceData, setServiceData] = React.useState({
    name: null,
    description: null,
    price: null,
    redirect: null,
    id: null,
  });
  const [redirectData, setRedirectData] = React.useState({
    phone: "",
    message: "",
  });
  const [snackBar, setSnackBar] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");
  const [dialog, setDialog] = React.useState(false);

  function onChangeText(object) {
    setServiceData((previous) => Object.assign({}, previous, object));
  }

  function onChangeRedirect(object) {
    setRedirectData((previous) => Object.assign({}, previous, object));
  }

  async function postData() {
    const fetchObject = {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serviceData),
    };

    let url;

    if (serviceData["id"] !== undefined) {
      url = `https://projeto-integrador-5-default-rtdb.firebaseio.com/services/${serviceData["id"]}.json`;
      fetchObject.method = "PUT";
    } else {
      url = `https://projeto-integrador-5-default-rtdb.firebaseio.com/services.json`;
      fetchObject.method = "POST";
    }

    const response = await fetch(url, fetchObject);

    if (response.status !== 200)
      throw Error(
        `Não foi possível adicionar, código de erro ${response.status}`
      );

    return true;
  }

  function handleSubmit() {
    if (!serviceData.name || !serviceData.price || !serviceData.description) {
      setSnackBarMessage("Erro: alguns campos não foram preenchidos.");
      setSnackBar(true);
      return;
    }
    postData()
      .then(() =>
        navigation.navigate("Services", {
          snackbar: {
            title: serviceData.name,
            description: serviceData.id
              ? "Você editou com sucesso!"
              : "Você adicionou um novo serviço com sucesso!",
          },
        })
      )
      .catch(() => {
        setSnackBarMessage("Não foi possível adicionar o serviço.");
        setSnackBar(true);
      });
  }

  function openDialog() {
    setDialog(true);
  }

  function handleDelete() {
    if (serviceData.id === undefined) {
      navigation.navigate("Services", {
        snackbar: {
          title: serviceData.name,
          description: "Não foi possível deletar.",
        },
      });
      return;
    }
    fetch(
      `https://projeto-integrador-5-default-rtdb.firebaseio.com/services/${serviceData["id"]}.json`,
      { method: "DELETE" }
    );
    setDialog(false);
    navigation.navigate("Services", {
      snackbar: {
        title: serviceData.name,
        description: "Deletado com sucesso.",
      },
    });
  }

  React.useEffect(() => {
    const serviceData = route?.params?.serviceData;
    if (route?.params?.serviceData !== undefined) setServiceData(serviceData);
    else
      setServiceData({
        name: null,
        description: null,
        price: null,
        redirect: null,
        id: null,
      });
  }, [route, setServiceData]);

  React.useEffect(() => {
    const { unmasked } = formatWithMask({
      text: redirectData.phone,
      mask: Masks.BRL_PHONE,
    });

    setServiceData((previous) =>
      Object.assign({}, previous, {
        redirect: `https://wa.me/55${unmasked}?text=${redirectData.message.replace(
          / /g,
          "%20"
        )}`,
      })
    );
  }, [redirectData, setServiceData]);

  return (
    <React.Fragment>
      <CustomAppBar
        navigation={navigation}
        serviceData={serviceData}
        title={serviceData.name ? serviceData.name : "Novo Serviço"}
        id={serviceData.id}
        handleSubmit={handleSubmit}
        openDialog={openDialog}
      />
      <KeyboardAwareScrollView>
        <View>
          <View style={{ padding: 20 }}>
            <Text style={styles.title}>Dados do Serviço</Text>
            <Input
              label={"Nome"}
              placeholder="Dê um nome ao serviço."
              value={serviceData.name}
              onChangeText={(text) => onChangeText({ name: text })}
            />
            <Input
              label="Descrição"
              placeholder="Descreva qual é o serviço."
              value={serviceData.description}
              onChangeText={(text) => onChangeText({ description: text })}
              multiline={true}
              numberOfLines={6}
            />
            <Input
              label="Preço"
              placeholder="Quanto custa o serviço?"
              value={serviceData.price}
              onChangeText={(text) => onChangeText({ price: text })}
              mask={Masks.BRL_CURRENCY}
              icon={"currency-brl"}
            />
            <Input label="Imagem" icon="image-area" disabled={true} />
          </View>
          <View style={{ padding: 20, paddingTop: 5 }}>
            <Text style={styles.title}>Opções de redirecionamento</Text>
            <Input
              label="Número"
              placeholder="Telefone de redirecionamento para o whatsapp."
              value={redirectData.phone}
              onChangeText={(text) => onChangeRedirect({ phone: text })}
              mask={Masks.BRL_PHONE}
              icon={"phone"}
            />
            <Input
              label="Mensagem pré-preenchida"
              placeholder="Mensagem que você quer que as pessoas lhe enviem ao socilitar o serviço."
              value={redirectData.message}
              onChangeText={(text) => onChangeRedirect({ message: text })}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <View style={{ padding: 20 }}>
            <Button
              style={mainStyles.button}
              labelStyle={mainStyles.textButton}
              mode="contained"
              onPress={handleSubmit}
            >
              {serviceData.id ? "Editar" : "Concluir"}
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Snackbar
        visible={snackBar}
        duration={2000}
        style={mainStyles.snackBar}
        onDismiss={() => setSnackBar(false)}
        wrapperStyle={mainStyles.snackBarWrapper}
        theme={{ colors: { surface: "#FFFFFF" } }}
      >
        {snackBarMessage}
      </Snackbar>
      <Dialog
        dialog={dialog}
        setDialog={setDialog}
        onAccept={handleDelete}
        title={`Deletar o serviço ${serviceData.name}?`}
        children={
          <Text style={{ color: "#FF0000", fontStyle: "italic" }}>
            Essa ação é irreversível, e todos os dados do serviço serão
            perdidos!
          </Text>
        }
      />
    </React.Fragment>
  );
}

const CustomAppBar = ({ navigation, title, id, handleSubmit, openDialog }) => {
  return (
    <Appbar.Header style={mainStyles.appBarBackground}>
      <Appbar.BackAction
        color="#FFFFFF"
        onPress={() => navigation.navigate("Services")}
      />
      <Appbar.Content
        titleStyle={mainStyles.appBarText}
        title={title !== undefined ? title : "Novo Serviço"}
      />
      {id ? (
        <Appbar.Action
          icon={"delete"}
          color="#FFFFFF"
          onPress={openDialog}
          size={32}
        />
      ) : (
        <Appbar.Action
          icon={"content-save"}
          color="#FFFFFF"
          onPress={handleSubmit}
          size={32}
          style={{ marginRight: 10 }}
        />
      )}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 20,
    color: colors.secondary,
    padding: 5,
  },
});
