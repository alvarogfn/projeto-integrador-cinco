import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  Drawer as PaperDrawer,
  IconButton as ButtonPaper,
} from "react-native-paper";

export default function CustomDrawer({ theme, navigation }, ...props) {
  const { routes, index } = navigation.getState();
  const actualRoute = routes[index].name;

  function activeRouteStyle(routeName) {
    return {
      backgroundColor:
        actualRoute === routeName ? theme.colors.primary : "transparent",
    };
  }

  return (
    <DrawerContentScrollView>
      <View>
        <PaperDrawer.Section style={styles.divider}>
          <ButtonPaper
            theme={theme}
            icon="home"
            size={40}
            onPress={() => navigation.jumpTo("Home")}
          />
        </PaperDrawer.Section>
        <PaperDrawer.Section>
          <PaperDrawer.Item
            label="Serviços"
            onPress={() => navigation.jumpTo("Services")}
            icon={"format-list-text"}
            theme={theme}
            style={activeRouteStyle("Services")}
          />
          <PaperDrawer.Item
            label="Análise"
            onPress={() => navigation.jumpTo("Analytics")}
            icon={"trending-up"}
            theme={theme}
            style={activeRouteStyle("Analytics")}
          />
          <PaperDrawer.Item
            label="Cursos"
            onPress={() => navigation.jumpTo("Courses")}
            icon={"sale"}
            theme={theme}
            style={activeRouteStyle("Courses")}
          />
        </PaperDrawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: "rgba(194, 194, 194, 0.25)",
    borderBottomWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
});
