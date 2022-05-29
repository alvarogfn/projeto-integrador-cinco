import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import AppBar from "../components/AppBar";
import { Colors } from "react-native-paper";
import { colors } from "../utils/styles";
import Snackbar from "../components/Snackbar";
import { UserContext } from "../Context";
import ServiceListItem from "../components/ServiceListItem";
import FAB from "../components/FAB";
import { CommonActions } from "@react-navigation/native";
import ActivityIndicator from "../components/ActivityIndicator";

export default function Services({ navigation, route }) {
  const [snackBar, setSnackbar] = React.useState(false);
  const [services, setServices] = React.useState(undefined);
  const [snackbarMessage, setSnackBarMessage] = React.useState(null);
  const { service } = React.useContext(UserContext);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const onFocus = navigation.addListener("focus", () => {
      service
        .getAll()
        .then(
          (r) => setServices(r),
          () => setServices([])
        )
        .then(() => setLoading(false));
    });

    return onFocus;
  }, [navigation, service, setLoading]);

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
            {snackbar.description ? (
              <Text style={{ color: "#FFFFFF" }}>{snackbar.description}</Text>
            ) : null}
          </View>
        );
      });
    }
  }, [route, setSnackbar]);

  return (
    <View style={styles.container}>
      <AppBar title={"Seus Serviços"} navigation={navigation} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={services}
          scrollEnabled={true}
          keyExtractor={({ id }) => id}
          style={styles.list}
          renderItem={({ item }) => {
            return <ServiceListItem item={item} navigation={navigation} />;
          }}
        />
      )}
      <FAB
        icon={"plus"}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "ServiceEditor", params: { from: "Services" } }],
          });
        }}
      />
      <Snackbar
        visible={snackBar}
        setVisible={setSnackbar}
        children={snackbarMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },

  list: {
    flexGrow: 1,
    marginTop: 15,
  },
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
