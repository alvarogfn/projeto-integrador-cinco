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
  Divider,
} from "react-native-paper";
import main, { colors } from "../utils/styles";

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
      <View style={styles.app}>
        <AppBar title="SERVIÇOS" navigation={navigation}></AppBar>
        <View style={{ padding: 20 }}>
          <Button
            icon={"plus-outline"}
            style={main.button}
            labelStyle={main.textButton}
            mode={"contained"}
            onPress={() => navigation.jumpTo("ServiceAdd")}
          >
            ADICIONAR NOVO
          </Button>
        </View>
        <View style={styles.list}>
          <Text style={{ ...main.title, marginBottom: 10 }}>
            LISTA DE SERVIÇOS
          </Text>
          <Surface
            style={{
              flexBasis: 200,
              flexGrow: 1,
              borderRadius: 10,
              padding: 10,
              margin: 10,
            }}
          >
            <Searchbar
              style={{ padding: 5, margin: 5, marginBottom: 20 }}
              theme={{ colors: { primary: colors.primary } }}
            />
            {serviceList !== null ? (
              <ServiceList serviceList={serviceList} navigation={navigation} />
            ) : (
              <View style={styles.loading}>
                <ActivityIndicator color={colors.primary} size="large" />
              </View>
            )}
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
        paddingRight: 10,
        width: "100%",
      }}
      renderItem={({ item }) => {
        return (
          <React.Fragment>
            <List.Item
              titleStyle={{ color: colors.textBlack }}
              title={item.name}
              onPress={() => console.log("ola")}
              right={(props) => (
                <IconButton
                  style={main.listCardAvatar}
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
            <Divider />
          </React.Fragment>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  app: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    maxHeight: "100%",
  },
  list: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
