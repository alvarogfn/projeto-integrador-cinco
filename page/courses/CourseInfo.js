import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../../Context';
import AppBarEditor from '../../components/AppBarEditor';
import { Card, Colors, Paragraph, Title } from 'react-native-paper';
import TitleLabel from '../../components/TitleLabel';
import { colors } from '../../utils/styles';

export default function CourseInfo() {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = React.useState({});

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
            uri: 'https://img.freepik.com/fotos-gratis/3d-rendem-de-uma-mesa-de-madeira-com-uma-imagem-defocussed-de-um-barco-em-um-lago_1048-3432.jpg?w=2000',
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
