import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Input from "../components/Input";
import { Appbar, Button } from "react-native-paper";
import mainStyles, { colors } from "../utils/styles";
import { Masks, formatWithMask } from "react-native-mask-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ServiceAdd({ navigation, route }) {
  const [serviceData, setServiceData] = React.useState({
    name: null,
    description: null,
    price: null,
    redirect: null,
  });

  const [redirectData, setRedirectData] = React.useState({
    phone: "",
    message: "",
  });

  React.useEffect(() => {
    const serviceData = route?.params?.serviceData;
    if (route?.params?.serviceData !== undefined) setServiceData(serviceData);
  }, [route, setServiceData]);

  function onChangeText(object) {
    setServiceData((previous) => Object.assign({}, previous, object));
  }

  function onChangeRedirect(object) {
    setRedirectData((previous) => Object.assign({}, previous, object));
  }

  React.useEffect(() => {
    const { unmasked } = formatWithMask({
      text: redirectData.phone,
      mask: Masks.BRL_PHONE,
    });

    setServiceData((previous) =>
      Object.assign({}, previous, {
        redirect: `https://wa.me/${unmasked}?text=${redirectData.message.replace(
          / /g,
          "%20"
        )}`,
      })
    );
  }, [redirectData, setServiceData]);

  function handleSubmit() {
    console.log(serviceData);
  }

  return (
    <React.Fragment>
      <CustomAppBar
        navigation={navigation}
        serviceData={serviceData}
        title={serviceData.name === null ? "Novo Serviço" : serviceData.name}
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
              Concluir
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 20,
    color: colors.secondary,
    padding: 5,
  },
});

const CustomAppBar = ({ navigation, title, serviceData }) => {
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
      <Appbar.Action
        icon={"content-save"}
        color="#FFFFFF"
        onPress={() =>
          navigation.navigate("Services", {
            serviceName:
              serviceData.name === null ? "Novo serviço" : serviceData.name,
          })
        }
      />
    </Appbar.Header>
  );
};
