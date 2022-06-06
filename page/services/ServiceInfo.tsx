import { View, StyleSheet } from 'react-native';
import React from 'react';
import AppBarEditor from '../../components/AppBarEditor';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../../Context';
import {
  Avatar,
  Card,
  Colors,
  Divider,
  Paragraph,
  Title,
} from 'react-native-paper';
import TitleLabel from '../../components/TitleLabel';
import useBackHandler from '../../hooks/useBackHandler';
import { stackNavigation } from '../../utils/types.navigation';
import { serviceType } from '../../utils/types';

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
        <Card.Content>
          <View style={styles.cardHeader}>
            <Title>{data.name}</Title>
            <Avatar.Image
              source={{
                uri: data.img as string,
              }}
              theme={{ colors: { primary: Colors.transparent } }}
            />
          </View>
          <Divider style={{ marginVertical: 10 }} />
          <View>
            <TitleLabel title={'Preço'} />
            <Paragraph>{data.price}</Paragraph>
            <TitleLabel title={'Descrição'} />
            <Paragraph>{data.description}</Paragraph>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
