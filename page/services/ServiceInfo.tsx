import { View, StyleSheet } from 'react-native';
import React from 'react';
import AppBarEditor from '../../components/AppBarEditor';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../../Context';
import { Card, Divider, Paragraph } from 'react-native-paper';
import TitleLabel from '../../components/TitleLabel';
import useBackHandler from '../../hooks/useBackHandler';
import { stackNavigation } from '../../utils/types.navigation';
import { serviceType } from '../../utils/types';
import { toPrice } from '../../utils/toPrice';
import { formatWithMask, Masks } from 'react-native-mask-input';
import ServiceComments from '../../components/ServiceComments';
import { ScrollView } from 'react-native-gesture-handler';

export default function ServiceInfo() {
  const navigation = useNavigation<stackNavigation>();

  const route: RouteProp<
    { params: { serviceId: string | undefined } },
    'params'
  > = useRoute();

  const [data, setData] = React.useState<serviceType | null>(null);
  const [id] = React.useState<string | undefined>(() => {
    if (typeof route.params?.serviceId === 'string')
      return route.params.serviceId;
    return undefined;
  });
  const { service } = React.useContext(UserContext)!;
  useBackHandler();

  React.useEffect(() => {
    if (id) service.get(id).then((r) => setData(r));
    else navigation.popToTop();
  }, [route, service, setData]);

  if (!data) return null;
  return (
    <View style={styles.container}>
      <AppBarEditor
        icon={'pencil-box'}
        title={data.name}
        popStackAmount={2}
        handleIcon={() =>
          navigation.push('ServiceEditor', {
            serviceId: route.params?.serviceId,
          })
        }
      />
      <ScrollView>
        <Card style={styles.card}>
          <Card.Cover
            style={styles.cardImage}
            source={{
              uri: data.img as string,
            }}
          ></Card.Cover>
          <Card.Title
            titleStyle={styles.cardTitle}
            title={data.name}
            titleNumberOfLines={4}
          />
          <Card.Content>
            <Divider style={{ marginVertical: 10 }} />
            <View>
              <TitleLabel title={'Preço'} />
              <Paragraph>{toPrice(parseInt(data.price) / 100)}</Paragraph>
              <TitleLabel title={'Descrição'} />
              <Paragraph>{data.description}</Paragraph>
              <TitleLabel title={'Whatsapp de Encaminhamento'} />
              <Paragraph>
                {
                  formatWithMask({ text: data.phone, mask: Masks.BRL_PHONE })
                    .masked
                }
              </Paragraph>
            </View>
          </Card.Content>
        </Card>
        {data.id !== undefined && (
          <Card style={styles.card}>
            <ServiceComments id={data.id} />
          </Card>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  card: {
    margin: 10,
  },
  cardTitle: {
    fontWeight: '900',
    textTransform: 'uppercase',
    paddingVertical: 10,
  },
  cardImage: {
    height: 300,
  },
});
