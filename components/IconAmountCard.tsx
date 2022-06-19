import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Avatar, Card, Colors } from 'react-native-paper';
import colors from '../utils/colors';

export default function IconAmountCard({
  amount,
  icon,
}: {
  amount: number;
  icon: string;
}) {
  return (
    <View style={styles.container}>
      <Avatar.Icon
        style={{ backgroundColor: Colors.transparent }}
        size={34}
        icon={icon}
        color={colors.pink}
      />
      <Text style={{ fontWeight: 'bold', color: Colors.grey600 }}>
        {amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
});
