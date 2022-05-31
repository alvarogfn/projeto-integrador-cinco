import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import AppBar from '../../components/AppBar';
import FAB from '../../components/FAB';
import { UserContext } from '../../Context';
import CourseListCard from '../../components/CourseListCard';
import ActivityIndicator from '../../components/ActivityIndicator';

export default function CoursesList({ navigation }) {
  const [listCurses, setListCourse] = React.useState();
  const [loading, setLoading] = React.useState();
  const { course } = React.useContext(UserContext);

  React.useEffect(() => {
    setLoading(true);

    const onFocus = navigation.addListener('focus', () => {
      course
        .getAll()
        .then(
          (r) => setListCourse(r),
          () => setListCourse([])
        )
        .then(() => setLoading(false));
    });
    return onFocus;
  }, [course, setLoading, setListCourse]);

  return (
    <React.Fragment>
      <AppBar title={'Cursos'} navigation={navigation} />
      <FAB icon={'plus'} onPress={() => navigation.push('CourseEditor')} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={styles.container}
          data={listCurses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CourseListCard data={item} />}
        />
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    margin: 10,
  },
});
