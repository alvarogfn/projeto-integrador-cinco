import { StyleSheet } from 'react-native';
import React from 'react';
import { Snackbar as PaperSnackbar } from 'react-native-paper';
import colors from '../utils/colors';

export default function Snackbar({
  setVisible,
  visible,
  children,
  duration,
}: {
  setVisible: () => void;
  visible: boolean;
  children: React.ReactNode;
  duration: number;
}) {
  return (
    <PaperSnackbar
      visible={visible}
      duration={duration || 2000}
      style={styles.snackbar}
      onDismiss={setVisible}
      wrapperStyle={styles.wrapper}
      theme={{ colors: { surface: '#FFFFFF' } }}
    >
      {children}
    </PaperSnackbar>
  );
}

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: colors.secondary,
    color: '#FFFFFF',
    display: 'flex',
    justifyContent: 'space-between',
  },
  wrapper: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
  },
});
