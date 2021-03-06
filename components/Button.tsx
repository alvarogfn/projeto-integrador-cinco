import { StyleSheet } from 'react-native';
import React from 'react';
import { Button as PaperButton, Colors } from 'react-native-paper';
import colors from '../utils/colors';

export default function Button({
  onPress,
  children,
  icon,
}: {
  onPress: () => void;
  children: React.ReactNode;
  icon?: string;
}) {
  return (
    <PaperButton
      mode="contained"
      icon={icon}
      onPress={onPress}
      labelStyle={{ ...styles.label }}
      theme={{
        colors: {
          text: Colors.white,
          primary: colors.pink,
        },
      }}
    >
      {children}
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  label: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
