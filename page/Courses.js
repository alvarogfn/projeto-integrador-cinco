import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppBar from "../components/AppBar";
import FAB from "../components/FAB";

export default function Courses({ navigation }) {
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
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});
