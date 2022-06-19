import { StyleSheet, View, ScrollView } from 'react-native';
import React from 'react';
import AppBar from '../../components/AppBar';
import { UserContext } from '../../Context';
import { Card, Colors, List, Text, Title } from 'react-native-paper';
import { rateType, serviceType } from '../../utils/types';
import IconAmountCard from '../../components/IconAmountCard';
import TitleLabel from '../../components/TitleLabel';
import colors from '../../utils/colors';
import RatesListCard from '../../components/RatesListCard';

export default function Analytics() {
  const { rates, service } = React.useContext(UserContext)!;

  const [serviceRates, setServicesRates] = React.useState<rateType[] | null>();
  const [services, setServices] = React.useState<serviceType[] | null>();

  React.useEffect(() => {
    async function fetchData() {
      const response = await rates.getAll();
      setServicesRates(response?.sort((a, b) => a.time - b.time).reverse());
    }
    fetchData();
  }, [rates]);

  React.useEffect(() => {
    async function fetchData() {
      const response = await service.getAll();
      setServices(response);
    }
    fetchData();
  }, [rates]);

  return (
    <>
      <AppBar title={'Métricas'} />
      <ScrollView>
        {services && serviceRates && (
          <View>
            <Card style={styles.card}>
              <Card.Content style={styles.cardItems}>
                <View style={{ flexGrow: 10 }}>
                  <TitleLabel title={'Total de Curtidas'} />
                </View>
                <IconAmountCard
                  icon={'heart'}
                  amount={serviceRates.reduce(
                    (acc, act) => acc + (act.like ? 1 : 0),
                    0
                  )}
                />
              </Card.Content>
            </Card>
            <Card style={styles.card}>
              <Card.Content style={styles.cardItems}>
                <View style={{ flexGrow: 10 }}>
                  <TitleLabel title={'Total de Comentários'} />
                </View>
                <IconAmountCard
                  icon="comment"
                  amount={serviceRates.reduce(
                    (acc, act) => acc + (act.like ? 1 : 0),
                    0
                  )}
                />
              </Card.Content>
            </Card>
            <Card style={styles.card}>
              <Card.Content>
                <View style={{ flexGrow: 10 }}>
                  <TitleLabel title={'Último Comentário'} />
                </View>
                <View style={{ paddingVertical: 20 }}>
                  <Text style={styles.name}>{serviceRates[0].name}</Text>
                  <Text style={styles.email}>{serviceRates[0].email}</Text>
                  <Text style={styles.description}>
                    {serviceRates[0].description}
                  </Text>
                  <Text style={styles.time}>
                    {new Date(serviceRates[0].time).toLocaleDateString(
                      'pt-BR',
                      {
                        year: 'numeric',
                        month: 'narrow',
                        day: 'numeric',
                      }
                    )}
                    {' - '}
                    {new Date(serviceRates[0].time).toLocaleTimeString(
                      'pt-BR',
                      {
                        hour: 'numeric',
                        minute: 'numeric',
                      }
                    )}
                  </Text>
                </View>
                <Text style={{ fontWeight: 'bold', color: colors.secondary }}>
                  {
                    services?.find(
                      (item) => item.id === serviceRates[0].rate_service_id
                    )?.name
                  }
                </Text>
              </Card.Content>
            </Card>
            <View>
              <Title style={styles.titleComments}>Comentários</Title>
              <View style={{ paddingVertical: 15 }}>
                {services.map((service) => {
                  return (
                    <Card style={styles.card} key={service.id}>
                      <List.Accordion
                        title={service.name}
                        theme={{ colors: { primary: colors.pink } }}
                        left={(props) => (
                          <List.Icon {...props} icon="comment" />
                        )}
                      >
                        <RatesListCard
                          rates={serviceRates.filter(
                            ({ rate_service_id }) =>
                              rate_service_id === service.id
                          )}
                        />
                      </List.Accordion>
                    </Card>
                  );
                })}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
}

/* 
      <>
        <AppBar title={'Home'} />
        <ScrollView>
          {loading ? (
            <ActivityIndicator />
          ) : (
            services &&
            serviceRates &&
            services.map((item) => {
              return (
                <Card key={item.id!} style={{ margin: 5 }}>
                  <Card.Content>
                    <View>
                      <TitleLabel title={item.name} />
                      <Text style={styles.total}>
                        {
                          serviceRates.filter(
                            ({ rate_service_id }) => rate_service_id === item.id
                          ).length
                        }
                      </Text>
                      <View style={styles.comments}>
                        <RatesListCard
                          rates={serviceRates.filter(
                            ({ rate_service_id }) => rate_service_id === item.id
                          )}
                        />
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              );
            })
          )}
        </ScrollView>
      </>
      */

const styles = StyleSheet.create({
  card: { margin: 10, marginBottom: 0 },
  titleComments: {
    fontSize: 24,
    textAlign: 'center',
    padding: 25,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  cardItems: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
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
