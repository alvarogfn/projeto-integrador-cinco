import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AppBar from '../../components/AppBar';
import Snackbar from '../../components/Snackbar';
import { UserContext } from '../../Context';
import ServiceListItem from '../../components/ServiceListItem';
import FAB from '../../components/FAB';
import ActivityIndicator from '../../components/ActivityIndicator';

export default function ServicesList({ navigation, route }) {
  const [services, setServices] = React.useState(undefined);
  const { service } = React.useContext(UserContext);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const onFocus = navigation.addListener('focus', () => {
      service
        .getAll()
        .then(
          (r) => setServices(r),
          () => setServices([])
        )
        .then(() => setLoading(false));
    });

    return onFocus;
  }, [navigation, service, setLoading]);

  return (
    <View style={styles.container}>
      <AppBar title={'Seus Serviços'} navigation={navigation} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={services}
          scrollEnabled={true}
          keyExtractor={({ id }) => id}
          style={styles.list}
          renderItem={({ item }) => {
            return <ServiceListItem item={item} navigation={navigation} />;
          }}
        />
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
});
