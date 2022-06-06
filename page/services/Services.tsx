import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ServicesList from './ServicesList';
import ServiceEditor from './ServiceEditor';
import ServiceInfo from './ServiceInfo';

const Stack = createStackNavigator();

export default function Services() {
  return (
    <Stack.Navigator
      initialRouteName="ServicesList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ServicesList" component={ServicesList} />
      <Stack.Screen name="ServiceEditor" component={ServiceEditor} />
      <Stack.Screen name="ServiceInfo" component={ServiceInfo} />
    </Stack.Navigator>
  );
}
