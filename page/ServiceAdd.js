import { View, Text } from "react-native";
import React from "react";
import Input from "../components/Input";
import { Appbar } from "react-native-paper";
import styles from "../utils/styles";

export default function ServiceAdd({ navigation, route }) {
  const [serviceData, setServiceData] = React.useState({ name: null });

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
          placeholder="Escreva o título do seu serviço."
          value={serviceData.name}
          onChangeText={(text) => onChangeText({ name: text })}
        />
        <Input label="Descrição" />
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
