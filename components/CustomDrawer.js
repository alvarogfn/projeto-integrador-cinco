import { StyleSheet, View } from "react-native";
import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Drawer as PaperDrawer } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CustomDrawer({ theme, navigation }, ...props) {
  return (
    <DrawerContentScrollView>
      <View>
        <PaperDrawer.Section>
          <PaperDrawer.Item
            label="Serviços"
            onPress={() => navigation.jumpTo("Services")}
            icon={"format-list-text"}
            theme={theme}
          />
        </PaperDrawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({});
