import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider as PaperProvider } from "react-native-paper";
import { useFonts, Roboto_500Medium } from "@expo-google-fonts/roboto";
import Home from "./page/Home";
import Services from "./page/Services";
import Promotional from "./page/Promotional";
import Analytics from "./page/Analytics";
import CustomDrawer from "./components/CustomDrawer";
import theme from "./utils/theme";
import ServiceInfo from "./page/ServiceInfo";
import ServiceAdd from "./page/ServiceAdd";

const Drawer = createDrawerNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
  });

  if (!fontsLoaded) return null;
  else
    return (
      <PaperProvider>
        <NavigationContainer>
          <Drawer.Navigator
            useLegacyImplementation
            screenOptions={{ headerShown: false }}
            drawerContent={(props) => <CustomDrawer {...props} theme={theme} />}
            initialRouteName="Services"
          >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Services" component={Services} />
            <Drawer.Screen name="Promotional" component={Promotional} />
            <Drawer.Screen name="Analytics" component={Analytics} />
            <Drawer.Screen name="ServiceInfo" component={ServiceInfo} />
            <Drawer.Screen name="ServiceAdd" component={ServiceAdd} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
}
