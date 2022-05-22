import { StyleSheet, Text } from "react-native";
import React from "react";
import { Button, Portal, Dialog as PaperDialog } from "react-native-paper";
import { colors } from "../utils/styles";

export default function Dialog({
  dialog,
  setDialog,
  onAccept,
  title,
  children,
}) {
  return (
    <Portal>
      <PaperDialog visible={dialog} onDismiss={setDialog}>
        <PaperDialog.Title>{title}</PaperDialog.Title>
        <PaperDialog.Content>{children}</PaperDialog.Content>
        <PaperDialog.Actions>
          <Button
            onPress={() => setDialog(false)}
            labelStyle={styles.buttonText}
            theme={{ colors: { primary: colors.secondary } }}
          >
            Não
          </Button>
          <Button
            onPress={onAccept}
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
    color: "#F",
  },
  buttonAccept: {
    color: "#FF0000",
  },

  buttonText: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
});
