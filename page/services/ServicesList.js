import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AppBar from '../../components/AppBar';
import Snackbar from '../../components/Snackbar';
import { UserContext } from '../../Context';
import ServiceListItem from '../../components/ServiceListItem';
import FAB from '../../components/FAB';
import ActivityIndicator from '../../components/ActivityIndicator';
import { Colors, Title } from 'react-native-paper';
import { colors } from '../../utils/styles';

export default function ServicesList({ navigation }) {
  const [services, setServices] = React.useState({});
  const { service } = React.useContext(UserContext);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const onFocus = navigation.addListener('focus', async () => {
      try {
        setLoading(true);
        const response = await service.getAll();
        setServices(response);
        setLoading(false);
      } catch (error) {
        setServices(null);
        setLoading(false);
      }
    });

    return onFocus;
  }, [navigation, service, setLoading]);

  return (
    <View style={styles.container}>
      <AppBar title={'Seus Serviços'} navigation={navigation} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          {services ? (
            <FlatList
              data={services}
              scrollEnabled={true}
              keyExtractor={({ id }) => id}
              style={styles.list}
              renderItem={({ item }) => {
                return <ServiceListItem item={item} navigation={navigation} />;
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
