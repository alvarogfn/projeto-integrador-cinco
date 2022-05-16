import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import AppBar from "../components/AppBar";
import {
  Button,
  Snackbar,
  ActivityIndicator,
  List,
  IconButton,
  Avatar,
  Searchbar,
  Surface,
} from "react-native-paper";
import styles, { colors } from "../utils/styles";

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
      <View style={container.app}>
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
        <View style={container.list}>
          <Text style={styles.title}>LISTA DE PRODUTOS</Text>
          <Surface
            style={{
              ...styles.serviceListCard,
              flexGrow: 1,
              maxHeight: "100%",
            }}
          >
            <View style={container.loading}>
              {serviceList ? (
                <ServiceList
                  serviceList={serviceList}
                  navigation={navigation}
                />
              ) : (
                <ActivityIndicator color={colors.primary} size="large" />
              )}
            </View>
          </Surface>
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
            fontWeight: "700",
            display: "flex",
            textTransform: "capitalize",
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
      scrollEnabled={true}
      keyExtractor={() => Math.random()}
      style={{
        flexGrow: 1,
        paddingTop: 10,
        paddingBottom: 10,
        width: "100%",
        maxHeight: 200,
      }}
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
                onPress={() =>
                  navigation.navigate("ServiceAdd", { serviceData: item })
                }
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
    />
  );
};

const container = StyleSheet.create({
  app: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    maxHeight: "100%",
  },
  list: {
    flexGrow: 1,
    height: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
