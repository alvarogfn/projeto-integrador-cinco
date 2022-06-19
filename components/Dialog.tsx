import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { Button, Portal, Dialog as PaperDialog } from 'react-native-paper';
import colors from '../utils/colors';

export default function Dialog({
  status,
  onDismiss,
  handleAccept,
  title,
  content,
}: {
  status: boolean;
  onDismiss: () => void;
  handleAccept: () => void;
  title: string;
  content: string;
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
            onPress={onDismiss}
            labelStyle={styles.buttonText}
            theme={{ colors: { primary: colors.secondary } }}
          >
            Não
          </Button>
          <Button
            onPress={handleAccept}
            theme={{ colors: { primary: '#c4c4c4' } }}
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
    color: '#ffF',
  },
  buttonText: {
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
});
