import { View, Text, FlatList } from "react-native";
import React from "react";
import AppBar from "../components/AppBar";
import {
  Button,
  Snackbar,
  ActivityIndicator,
  List,
  IconButton,
  Divider,
  Avatar,
} from "react-native-paper";
import styles, { colors } from "../utils/styles";
import ServiceAdd from "./ServiceAdd";

export default function Services({ navigation, route }) {
  const [showSnackBar, setShowSnackBar] = React.useState(
    route?.params?.serviceName !== undefined
  );

  const [serviceName, setServiceName] = React.useState("");

  const [serviceList, setServiceList] = React.useState(undefined);

  async function getServicesList() {
    const response = await fetch(
      "https://projeto-integrador-5-default-rtdb.firebaseio.com/product.json"
    );
    const json = await response.json();

    return json;
  }

  React.useEffect(() => {
    getServicesList().then((r) => setServiceList(r));
  }, []);

  React.useEffect(() => {
    const serviceName = route?.params?.serviceName;

    if (serviceName !== undefined) {
      setShowSnackBar(true);
      setServiceName(serviceName);
    }
  }, [route, setShowSnackBar, setServiceName]);

  return (
    <React.Fragment>
      <View style={{ position: "relative" }}>
        <AppBar title="SERVIÇOS" navigation={navigation}></AppBar>
        <View style={{ padding: 20 }}>
          <Button
            icon={"plus-outline"}
            style={styles.button}
            labelStyle={styles.textButton}
            mode={"contained"}
            onPress={() => navigation.jumpTo("ServiceAdd")}
          >
            ADICIONAR NOVO
          </Button>
        </View>
        <View style={styles.centralize}>
          <Text style={styles.title}>LISTA DE PRODUTOS</Text>
          <View style={{ paddingTop: 30, width: "90%" }}>
            {serviceList ? (
              <ServiceList serviceList={serviceList} navigation={navigation} />
            ) : (
              <ActivityIndicator color={colors.primary} size="large" />
            )}
          </View>
        </View>
      </View>
      <Snackbar
        visible={showSnackBar}
        duration={2000}
        style={styles.snackBar}
        onDismiss={() => setShowSnackBar(false)}
        wrapperStyle={styles.snackBarWrapper}
        theme={{ colors: { surface: "#FFFFFF" } }}
      >
        Você adicionou o serviço:
        <Text
          style={{
            fontWeight: 700,
            display: "block",
            textTransform: "Capitalize",
          }}
        >
          {serviceName}
        </Text>
      </Snackbar>
    </React.Fragment>
  );
}

const ServiceList = ({ navigation, serviceList }) => {
  return (
    <FlatList
      data={serviceList}
      renderItem={({ item }) => {
        return (
          <List.Item
            style={styles.serviceListCard}
            titleStyle={styles.listTextContent}
            title={item.name}
            onPress={() => console.log("ola")}
            right={(props) => (
              <IconButton
                style={styles.listCardAvatar}
                size={35}
                icon="square-edit-outline"
                color={colors.primary}
                onPress={() => navigation.navigate("ServiceAdd")}
              />
            )}
            left={(props) => (
              <Avatar.Image
                {...props}
                color={"transparent"}
                source={{ uri: item.img }}
              />
            )}
          />
        );
      }}
      keyExtractor={() => Math.random()}
    />
  );
};
