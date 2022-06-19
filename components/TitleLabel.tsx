import { StyleSheet } from 'react-native';
import React from 'react';
import colors from '../utils/colors';
import { Subheading } from 'react-native-paper';

export default function TitleLabel({ title }: { title: string }) {
  return <Subheading style={styles.title}>{title}</Subheading>;
}

const styles = StyleSheet.create({
  title: {
    color: colors.pink,
    fontWeight: 'bold',
  },
});
