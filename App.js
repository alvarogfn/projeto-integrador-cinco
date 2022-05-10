import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Home from "./page/Home";
import Services from "./page/Services";
import Promotional from "./page/Promotional";
import Analytics from "./page/Analytics";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow",
  },
};

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator useLegacyImplementation>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Services" component={Services} />
          <Drawer.Screen name="Promotional" component={Promotional} />
          <Drawer.Screen name="Analytics" component={Analytics} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
