import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { useFonts, Roboto_500Medium } from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import Home from "./page/Home";
import Services from "./page/Services";
import Promotional from "./page/Promotional";
import Analytics from "./page/Analytics";
import CustomDrawer from "./components/CustomDrawer";

const theme = {
  ...DefaultTheme,
  colors: {
    primary: "#ECBBAC",
    accent: "#3A6450",
    text: "#99000000",
  },
  fonts: configureFonts({
    default: {
      medium: {
        fontFamily: "Roboto Medium",
      },
    },
  }),
};

const Drawer = createDrawerNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
  });

  if (!fontsLoaded) return <AppLoading />;
  else
    return (
      <PaperProvider>
        <NavigationContainer>
          <Drawer.Navigator
            useLegacyImplementation
            screenOptions={{ headerShown: false }}
            drawerContent={(props) => <CustomDrawer {...props} theme={theme} />}
          >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Services" component={Services} />
            <Drawer.Screen name="Promotional" component={Promotional} />
            <Drawer.Screen name="Analytics" component={Analytics} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
}
