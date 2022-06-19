import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Avatar, Colors, Divider, Title } from 'react-native-paper';
import { UserContext } from '../Context';
import { rateType } from '../utils/types';
import colors from '../utils/colors';

import IconAmountCard from './IconAmountCard';

export default function ServiceComments({ id }: { id: string }) {
  const { rates } = React.useContext(UserContext)!;

  const [serviceRates, setServiceRate] = React.useState<rateType[] | null>(
    null
  );

  React.useEffect(() => {
    async function fetchData() {
      const response = await rates.get(id);
      if (response) setServiceRate(response.sort((a, b) => b.time - a.time));
    }
    if (id) fetchData();
  }, [setServiceRate, rates, id]);

  if (serviceRates === null) return null;

  return (
    <View>
      <View style={styles.header}>
        <Title style={styles.title}>Avaliações</Title>
        <IconAmountCard
          icon={'heart'}
          amount={
            serviceRates ? serviceRates.filter((item) => item.like).length : 0
          }
        ></IconAmountCard>
      </View>

      {serviceRates.map((item, index) => (
        <View key={item.rate_id + index}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.secondary,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexGrow: 5,
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  headerLikes: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  card: {
    padding: 20,
    position: 'relative',
  },
  email: {
    fontSize: 12,
    color: Colors.grey500,
    textTransform: 'lowercase',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
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
