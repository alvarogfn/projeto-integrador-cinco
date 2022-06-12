import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import AppBar from '../../components/AppBar';
import FAB from '../../components/FAB';
import { UserContext } from '../../Context';
import CourseListCard from '../../components/CourseListCard';
import ActivityIndicator from '../../components/ActivityIndicator';
import { useNavigation } from '@react-navigation/native';
import { stackNavigation } from '../../utils/types.navigation';
import { courseType } from '../../utils/types';

export default function CoursesList() {
  const navigation = useNavigation<stackNavigation>();
  const [listCurses, setListCourse] = React.useState<courseType[] | null>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { course } = React.useContext(UserContext)!;

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
      <AppBar title={'Anúncios'} />
      <FAB icon={'plus'} onPress={() => navigation.push('CourseEditor')} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={styles.container}
          data={listCurses}
          keyExtractor={(item) => item.id!}
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
