import { StyleSheet, Text } from "react-native";
import React from "react";
import { Button, Portal, Dialog as PaperDialog } from "react-native-paper";
import { colors } from "../utils/styles";

export default function Dialog({
  status,
  onDismiss,
  handleAccept,
  title,
  content,
}) {
  return (
    <Portal>
      <PaperDialog visible={status} onDismiss={onDismiss}>
        <PaperDialog.Title>{title}</PaperDialog.Title>
        <PaperDialog.Content>
          <Text>{content}</Text>
        </PaperDialog.Content>
        <PaperDialog.Actions>
          <Button
            onPress={() => setDialog(false)}
            labelStyle={styles.buttonText}
            theme={{ colors: { primary: colors.secondary } }}
          >
            Não
          </Button>
          <Button
            onPress={handleAccept}
            theme={{ colors: { primary: "#c4c4c4" } }}
            style={styles.buttonAccept}
            labelStyle={styles.buttonText}
          >
            Sim
          </Button>
        </PaperDialog.Actions>
      </PaperDialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  button: {
    color: "#ffF",
  },
  buttonAccept: {
    color: "#FF0000",
  },
  buttonText: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
});
