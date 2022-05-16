import { View, Text } from "react-native";
import React from "react";
import Input from "../components/Input";
import { Appbar } from "react-native-paper";
import styles from "../utils/styles";

export default function ServiceAdd({ navigation, route }) {
  const [serviceData, setServiceData] = React.useState({
    name: null,
    description: null,
    price: null,
    redirect: null,
  });

  React.useEffect(() => {
    const serviceData = route?.params?.serviceData;
    if (route?.params?.serviceData !== undefined) setServiceData(serviceData);
  }, [route, setServiceData]);

  function onChangeText(object) {
    setServiceData((previus) => Object.assign({}, previus, object));
    console.log(serviceData);
  }

  return (
    <View>
      <CustomAppBar
        navigation={navigation}
        serviceData={serviceData}
        title={serviceData.name === null ? "Novo Serviço" : serviceData.name}
      />
      <View style={{ padding: 20 }}>
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
        />
      </View>
    </View>
  );
}

const CustomAppBar = ({ navigation, title, serviceData }) => {
  return (
    <Appbar.Header style={styles.appBarBackground}>
      <Appbar.BackAction
        color="#FFFFFF"
        onPress={() => navigation.navigate("Services")}
      />
      <Appbar.Content
        titleStyle={styles.appBarText}
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
