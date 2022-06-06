import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../../Context';
import AppBarEditor from '../../components/AppBarEditor';
import { Card, Colors, Paragraph, Title } from 'react-native-paper';
import { colors } from '../../utils/styles';
import useBackHandler from '../../hooks/useBackHandler';

export default function CourseInfo() {
  const navigation = useNavigation();
  const route = useRoute();
  useBackHandler();
  const [data, setData] = React.useState({});

  useBackHandler();

  const { course } = React.useContext(UserContext);

  React.useEffect(() => {
    const id = route?.params?.courseId;
    if (id) {
      course.get(id).then((r) => setData(r));
      return;
    }

    navigation.popToTop();
  }, [route, course, setData]);

  return (
    <View>
      <AppBarEditor
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
            uri: data.img,
          }}
        />
        <Card.Content>
          <Title style={styles.title}>{data.title}</Title>
          <Paragraph style={styles.text}>{data.description}</Paragraph>
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
