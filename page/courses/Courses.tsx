import { createStackNavigator } from '@react-navigation/stack';
import CoursesList from './CoursesList';
import CourseEditor from './CourseEditor';
import CourseInfo from './CourseInfo';
import React from 'react';

const Stack = createStackNavigator();

export default function Courses() {
  return (
    <Stack.Navigator
      initialRouteName="CoursesList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="CoursesList" component={CoursesList} />
      <Stack.Screen name="CourseEditor" component={CourseEditor} />
      <Stack.Screen name="CourseInfo" component={CourseInfo} />
    </Stack.Navigator>
  );
}
