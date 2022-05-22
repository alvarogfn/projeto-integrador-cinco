import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import AppBar from "../components/AppBar";
import {
  Button,
  ActivityIndicator,
  List,
  IconButton,
  Avatar,
  Searchbar,
  Surface,
  Divider,
} from "react-native-paper";
import main, { colors } from "../utils/styles";
import Snackbar from "../components/Snackbar";
import { useFocusEffect } from "@react-navigation/native";

export default function Services({ navigation, route }) {
  const [snackBar, setSnackbar] = React.useState(false);
  const [serviceList, setServiceList] = React.useState(undefined);
  const [snackbarMessage, setSnackBarMessage] = React.useState(null);

  async function getServicesList() {
    const response = await fetch(
      "https://projeto-integrador-5-default-rtdb.firebaseio.com/services.json"
    );
    const json = await response.json();
    if (json === null || response.status !== 200) throw new Error("");
    return json;
  }

  React.useEffect(() => {
    const snackbar = route?.params?.snackbar;
    if (snackbar) {
      setSnackbar(true);
      setSnackBarMessage(() => {
        return (
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Text style={{ fontWeight: "900", color: "#FFFFFF" }}>
              {snackbar.title}
            </Text>
            <Text style={{ color: "#FFFFFF" }}>{snackbar.description}</Text>
          </View>
        );
      });
    }
  }, [route, setSnackbar]);

  useFocusEffect(() => {
    getServicesList()
      .then((response) => {
        setServiceList(
          Object.keys(response).map((key) => {
            return { ...response[key], id: key };
          })
        );
      })
      .catch(() => setServiceList([]));
  });

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
        <View style={styles.list} key={Math.random()}>
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
        visible={snackBar}
        setVisible={setSnackbar}
        children={snackbarMessage}
      />
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
                  onPress={() => {
                    navigation.navigate("ServiceAdd", {
                      serviceData: item,
                      serviceId: item.id,
                    });
                  }}
                />
              )}
              left={(props) => (
                <Avatar.Image
                  {...props}
                  theme={{ colors: { primary: colors.primary } }}
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
