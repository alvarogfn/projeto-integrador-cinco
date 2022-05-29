import { StyleSheet } from "react-native";
import React from "react";
import { Avatar, Card, IconButton, List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../utils/styles";

export default function ServiceListItem({ item }) {
  const navigation = useNavigation();

  return (
    <Card elevation={1} style={styles.container}>
      <List.Item
        left={(props) => (
          <Avatar.Image
            {...props}
            size={58}
            style={styles.avatar}
            theme={{ colors: { primary: colors.secondary } }}
            source={{
              uri: item.image,
            }}
          />
        )}
        right={() => (
          <IconButton
            size={35}
            icon="square-edit-outline"
            color={colors.secondary}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "ServiceEditor",
                    params: { from: "Services", serviceId: item.id },
                  },
                ],
              });
            }}
          />
        )}
        title={item.name}
        titleStyle={styles.label}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginVertical: 5,
    backgroundColor: "#faeeea",
  },
  label: {
    color: colors.secondary,
    fontWeight: "900",
  },
  avatar: {
    alignSelf: "center",
    marginRight: 20,
  },
});
