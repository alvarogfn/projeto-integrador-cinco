import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import AppBar from "../components/AppBar";
import { Button } from "react-native-paper";
import styles, { colors } from "../utils/styles";

export default function Services({ navigation }) {
  return (
    <View>
      <AppBar title="SERVIÇOS" navigation={navigation}></AppBar>
      <View style={{ padding: 20 }}>
        <Button
          icon={"plus-outline"}
          style={styles.button}
          labelStyle={styles.textButton}
          mode={"contained"}
        >
          ADICIONAR NOVO
        </Button>
      </View>
      <View style={styles.centralize}>
        <Text style={styles.title}>LISTA DE PRODUTOS</Text>
        <View style={{ paddingTop: 30 }}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      </View>
    </View>
  );
}
