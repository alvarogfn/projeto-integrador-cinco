import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Text } from 'react-native-paper';
import ActivityIndicator from '../components/ActivityIndicator';
import AppBar from '../components/AppBar';
import RatesListCard from '../components/RatesListCard';
import TitleLabel from '../components/TitleLabel';
import { UserContext } from '../Context';
import { colors } from '../utils/styles';
import { rateType, serviceType } from '../utils/types';
import { drawerNavigation } from '../utils/types.navigation';

export default function Home({ navigation }: { navigation: drawerNavigation }) {
  const { rates, service } = React.useContext(UserContext)!;
  const [loading, setLoading] = React.useState(false);
  const [serviceRates, setServicesRates] = React.useState<rateType[] | null>();
  const [services, setServices] = React.useState<serviceType[] | null>();
  navigation.jumpTo('Services');
  React.useEffect(() => {
    async function fetchData() {
      const response = await rates.getAll();
      setServicesRates(response?.sort((a, b) => a.time - b.time).reverse());
    }
    fetchData();
  }, [rates]);

  React.useEffect(() => {
    const onFocus = navigation.addListener('focus', async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await service.getAll();
        setServices(response);
      } catch (e) {
        console.log('An Error ocorred in Home ', e);
      } finally {
        setLoading(false);
      }
    });

    return onFocus;
  }, [rates]);

  return null;
}
