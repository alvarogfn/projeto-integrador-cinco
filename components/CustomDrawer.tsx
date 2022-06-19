import { StyleSheet, View } from 'react-native';
import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
  Colors,
  Drawer as PaperDrawer,
  IconButton as ButtonPaper,
} from 'react-native-paper';
import { drawerNavigation } from '../utils/types.navigation';
import colors from '../utils/colors';

export default function CustomDrawer({
  navigation,
}: {
  navigation: drawerNavigation;
}) {
  const { routes, index } = navigation.getState();
  const actualRoute = routes[index].name;
  return (
    <DrawerContentScrollView>
      <View>
        <View style={styles.home}>
          <ButtonPaper
            icon="home"
            size={50}
            style={styles.homeIcon}
            onPress={() => navigation.jumpTo('Services')} //TODO Hack
            color={Colors.white}
          />
        </View>
        <View>
          <PaperDrawer.Item
            label="Serviços"
            onPress={() => navigation.jumpTo('Services')}
            icon={require('../assets/services-icon.png')}
            active={actualRoute === 'Services'}
            theme={{
              colors: {
                primary: Colors.white,
              },
            }}
            style={{
              ...styles.item,
              ...(actualRoute === 'Services' && styles.activeItem),
            }}
          ></PaperDrawer.Item>
          <PaperDrawer.Item
            label="Métricas"
            onPress={() => navigation.jumpTo('Analytics')}
            icon={require('../assets/metrics-icon.png')}
            active={actualRoute === 'Analytics'}
            theme={{
              colors: {
                primary: Colors.white,
              },
            }}
            style={{
              ...styles.item,
              ...(actualRoute === 'Analytics' && styles.activeItem),
            }}
          />
          <PaperDrawer.Item
            label="Anuncios"
            onPress={() => navigation.jumpTo('Courses')}
            icon={require('../assets/promotional-icon.png')}
            active={actualRoute === 'Courses'}
            theme={{
              colors: {
                primary: Colors.white,
              },
            }}
            style={{
              ...styles.item,
              ...(actualRoute === 'Courses' && styles.activeItem),
            }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  home: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  homeIcon: {
    width: 70,
    height: 70,
    backgroundColor: colors.pink,
    borderRadius: 60,
    color: colors.textWhite,
  },
  item: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.transparent,
  },
  activeItem: {
    color: Colors.white,
    backgroundColor: colors.pink,
  },
});
