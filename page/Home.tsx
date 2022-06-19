import React from 'react';
import AppBar from '../components/AppBar';
import { drawerNavigation } from '../utils/types.navigation';

export default function Home({ navigation }: { navigation: drawerNavigation }) {
  navigation.jumpTo('Services');
  return <AppBar title="home"></AppBar>;
}
