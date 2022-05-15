import { View, Text } from "react-native";
import React from "react";
import { Appbar, TextInput as Input } from "react-native-paper";
import styles from "../utils/styles";

export default function ServiceAdd({ navigation, title }) {
  return (
    <View>
      <CustomAppBar navigation={navigation} title={title} />
      <Text>ServiceAdd</Text>
    </View>
  );
}

const CustomAppBar = ({ navigation, title }) => {
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
            serviceName: "Sint non excepteur veniam.",
          })
        }
      />
    </Appbar.Header>
  );
};
