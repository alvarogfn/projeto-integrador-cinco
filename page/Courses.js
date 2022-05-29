import { StyleSheet } from "react-native";
import React from "react";
import AppBar from "../components/AppBar";
import FAB from "../components/FAB";
import { FlatList } from "react-native-gesture-handler";
import react from "react";
import { UserContext } from "../Context";
import CourseListCard from "../components/CourseListCard";

export default function Courses({ navigation }) {
  const [listCurses, setListCourse] = react.useState();
  const [loading, setLoading] = react.useState();
  const { course } = react.useContext(UserContext);

  React.useEffect(() => {
    setLoading(true);
    const onFocus = navigation.addListener("focus", () => {
      course
        .getAll()
        .then(
          (r) => setListCourse(r),
          () => setListCourse([])
        )
        .then(() => setLoading(false));
    });

    return onFocus;
  }, [navigation, course, setLoading, setListCourse]);

  return (
    <React.Fragment>
      <AppBar title={"Cursos"} navigation={navigation} />
      <FAB
        icon={"plus"}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "CourseEditor", params: { from: "Courses" } }],
          })
        }
      />
      <FlatList
        style={styles.container}
        data={listCurses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseListCard data={item} />}
      />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    margin: 10,
  },
});
