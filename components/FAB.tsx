import { StyleSheet } from 'react-native';
import React from 'react';
import { FAB as PaperFAB } from 'react-native-paper';
import colors from '../utils/colors';

export default function FAB({
  icon,
  onPress,
}: {
  icon: string;
  onPress: () => void;
}) {
  return (
    <PaperFAB
      style={styles.FAB}
      icon={icon}
      color={'#ffffff'}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  FAB: {
    backgroundColor: colors.pink,
    position: 'absolute',
    right: 10,
    bottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});
