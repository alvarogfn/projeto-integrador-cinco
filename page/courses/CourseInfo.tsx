import { StyleSheet, View } from 'react-native';
import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../../Context';
import AppBarEditor from '../../components/AppBarEditor';
import { Card, Colors, Paragraph, Title } from 'react-native-paper';
import { colors } from '../../utils/styles';
import useBackHandler from '../../hooks/useBackHandler';
import { stackNavigation } from '../../utils/types.navigation';
import { courseType } from '../../utils/types';
import TitleLabel from '../../components/TitleLabel';

export default function CourseInfo() {
  const navigation = useNavigation<stackNavigation>();
  const route: RouteProp<
    { params: { courseId: string | undefined } },
    'params'
  > = useRoute();
  useBackHandler();
  const [data, setData] = React.useState<courseType | null>(null);

  useBackHandler();

  const { course } = React.useContext(UserContext)!;

  React.useEffect(() => {
    async function fetchData() {
      const id = route?.params?.courseId;
      if (!id) {
        navigation.popToTop();
        return;
      }

      const response = await course.get(id);

      if (response === null) {
        navigation.popToTop();
        return;
      }

      setData(response);
    }

    fetchData();
  }, [route, course, setData, navigation]);
  if (data === null) return null;
  return (
    <View>
      <AppBarEditor
        title={data.title}
        icon={'pencil-box'}
        popStackAmount={2}
        handleIcon={() =>
          navigation.push('CourseEditor', {
            courseId: route?.params?.courseId,
          })
        }
      />
      <Card style={styles.card}>
        <Card.Cover
          source={{
            uri: data.img as string,
          }}
        />
        <Card.Title title={data.title} titleNumberOfLines={3}></Card.Title>
        <Card.Content>
          <TitleLabel title={'Descrição'} />
          <Paragraph>{data.description}</Paragraph>
          <TitleLabel title={'Redirecionamento'} />
          <Paragraph style={{ color: Colors.grey400 }}>
            {data.redirect}
          </Paragraph>
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
  title: {
    color: colors.primary,
    fontWeight: 'bold',
    marginVertical: 7,
  },
});
