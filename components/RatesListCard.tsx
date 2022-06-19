import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { rateType } from '../utils/types';
import { Avatar, Colors, Divider } from 'react-native-paper';
import colors from '../utils/colors';

export default function RatesListCard({ rates }: { rates: rateType[] }) {
  if (rates.length === 0) return null;
  return (
    <>
      {rates.map((item) => (
        <View key={item.rate_id}>
          <Divider />
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.time}>
              {new Date(item.time).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'narrow',
                day: 'numeric',
              })}
              {' - '}
              {new Date(item.time).toLocaleTimeString('pt-BR', {
                hour: 'numeric',
                minute: 'numeric',
              })}
            </Text>
            {item.like && (
              <Avatar.Icon
                style={styles.like}
                size={34}
                icon="heart"
                color={colors.pink}
              />
            )}
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    padding: 10,
    paddingBottom: 35,
  },
  email: {
    fontSize: 12,
    color: Colors.grey500,
    textTransform: 'lowercase',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 12,
  },
  description: {
    marginTop: 5,
    fontSize: 13,
    paddingHorizontal: 10,
  },
  time: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 10,
    color: Colors.grey500,
  },
  like: {
    position: 'absolute',
    backgroundColor: Colors.transparent,
    bottom: 0,
    right: 0,
  },
});
