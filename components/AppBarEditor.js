import { StyleSheet } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { colors } from "../utils/styles";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AppBarEditor({ title, icon, handleIcon }) {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <Appbar.Header style={styles.container}>
      <Appbar.BackAction
        color="#FFFFFF"
        onPress={() => navigation.navigate(route.params.from)}
      />
      <Appbar.Content titleStyle={styles.text} title={title} />
      <Appbar.Action
        icon={icon}
        color="#FFFFFF"
        onPress={handleIcon}
        size={32}
        style={{ marginRight: 10 }}
      />
    </Appbar.Header>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.textWhite,
    fontWeight: "500",
    fontSize: 20,
    textTransform: "capitalize",
  },
});
