import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import Home from './page/Home';
import CustomDrawer from './components/CustomDrawer';
import theme from './utils/theme';
import { UserStorage } from './Context';
import Services from './page/services/Services';
import Courses from './page/courses/Courses';
import Analytics from './page/analytics/Analytics';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <UserStorage>
      <PaperProvider>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            backBehavior={'history'}
            drawerContent={(props) => <CustomDrawer {...props} theme={theme} />}
            initialRouteName="Home"
          >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Services" component={Services} />
            <Drawer.Screen name="Courses" component={Courses} />
            <Drawer.Screen name="Analytics" component={Analytics} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </UserStorage>
  );
}
