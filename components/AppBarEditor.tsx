import { StyleSheet } from 'react-native';
import React from 'react';
import { Appbar } from 'react-native-paper';
import { colors } from '../utils/styles';
import { useNavigation } from '@react-navigation/native';
import { stackNavigation } from '../utils/types.navigation';

export default function AppBarEditor({
  title,
  icon,
  handleIcon,
  popStackAmount = 1,
}: {
  title: string;
  icon?: string;
  handleIcon?: () => void;
  popStackAmount?: number;
}) {
  const navigation = useNavigation<stackNavigation>();
  return (
    <Appbar.Header style={styles.container}>
      <Appbar.BackAction
        color="#FFFFFF"
        onPress={() => navigation.pop(popStackAmount)}
      />
      <Appbar.Content titleStyle={styles.text} title={title} />
      {icon && handleIcon && (
        <Appbar.Action
          icon={icon}
          color="#FFFFFF"
          onPress={handleIcon}
          size={32}
          style={{ marginRight: 10 }}
        />
      )}
    </Appbar.Header>
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
