import { View, StyleSheet } from 'react-native';
import React from 'react';
import AppBarEditor from '../../components/AppBarEditor';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../../Context';
import { Card, Divider, Paragraph, Title } from 'react-native-paper';
import TitleLabel from '../../components/TitleLabel';
import useBackHandler from '../../hooks/useBackHandler';
import { stackNavigation } from '../../utils/types.navigation';
import { serviceType } from '../../utils/types';
import { toPrice } from '../../utils/toPrice';
import { formatWithMask, Masks } from 'react-native-mask-input';

export default function ServiceInfo() {
  const navigation = useNavigation<stackNavigation>();

  const route: RouteProp<
    { params: { serviceId: string | undefined } },
    'params'
  > = useRoute();

  const [data, setData] = React.useState<serviceType | null>(null);
  const { service } = React.useContext(UserContext)!;
  useBackHandler();

  React.useEffect(() => {
    if (route?.params?.serviceId)
      service.get(route?.params?.serviceId).then((r) => setData(r));
    else navigation.popToTop();
  }, [route, service, setData]);

  if (!data) return null;
  return (
    <View>
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
      <Card style={styles.card}>
        <Card.Content>
          <Title>oi</Title>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
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
