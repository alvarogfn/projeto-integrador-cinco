import React from 'react';
import * as Paper from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { colors } from '../utils/styles';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function AppBar({ title }: { title: string }) {
  const navigation = useNavigation();
  return (
    <Paper.Appbar.Header style={styles.container}>
      <Paper.Appbar.Action
        icon={'menu'}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        color={'#FFFFFF'}
      />
      <Paper.Appbar.Content title={title} titleStyle={styles.text} />
    </Paper.Appbar.Header>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.textWhite,
    fontWeight: '500',
    fontSize: 20,
    textTransform: 'capitalize',
  },
});
