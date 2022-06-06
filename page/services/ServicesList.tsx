import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import AppBar from '../../components/AppBar';
import { UserContext } from '../../Context';
import ServiceListItem from '../../components/ServiceListItem';
import FAB from '../../components/FAB';
import ActivityIndicator from '../../components/ActivityIndicator';
import { Title } from 'react-native-paper';
import { colors } from '../../utils/styles';
import { context } from '../../utils/types.context';
import { useNavigation } from '@react-navigation/native';
import { serviceType } from '../../utils/types';
import { stackNavigation } from '../../utils/types.navigation';

export default function ServicesList() {
  const navigation = useNavigation<stackNavigation>();
  const [services, setServices] = React.useState<serviceType[]>([]);
  const { service } = React.useContext<context | null>(UserContext)!;
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const onFocus = navigation.addListener('focus', async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await service.getAll();
        if (!response) throw new Error();
        setServices(response);
      } catch (error) {
        setServices(() => []);
      } finally {
        setLoading(false);
      }
    });

    return onFocus;
  }, [navigation, service, setLoading]);

  return (
    <View style={styles.container}>
      <AppBar title={'Seus Serviços'} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {services ? (
            <FlatList
              data={services}
              scrollEnabled={true}
              keyExtractor={({ id }) => id!}
              style={styles.list}
              renderItem={({ item }) => {
                return <ServiceListItem item={item} />;
              }}
            />
          ) : (
            <Title style={styles.empty}>
              Não existem serviços para mostrar!
            </Title>
          )}
        </>
      )}
      <FAB
        icon={'plus'}
        onPress={() => navigation.push('ServiceEditor', { from: 'Services' })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  list: {
    flexGrow: 1,
    marginTop: 15,
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  empty: {
    color: colors.primary,
    fontWeight: 'bold',
    padding: 20,
  },
});
