import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider as PaperProvider } from "react-native-paper";
import { useFonts, Roboto_500Medium } from "@expo-google-fonts/roboto";
import Home from "./page/Home";
import Services from "./page/Services";
import Courses from "./page/Courses";
import Analytics from "./page/Analytics";
import CustomDrawer from "./components/CustomDrawer";
import theme from "./utils/theme";
import ServiceInfo from "./page/ServiceInfo";
import ServiceEditor from "./page/ServiceEditor";
import { UserStorage } from "./Context";
import CourseEditor from "./page/CourseEditor";

const Drawer = createDrawerNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
  });

  if (!fontsLoaded) return null;
  else
    return (
      <UserStorage>
        <PaperProvider>
          <NavigationContainer>
            <Drawer.Navigator
              screenOptions={{ headerShown: false }}
              backBehavior={"history"}
              drawerContent={(props) => (
                <CustomDrawer {...props} theme={theme} />
              )}
              initialRouteName="Home"
            >
              <Drawer.Screen name="Home" component={Home} />
              <Drawer.Screen name="Services" component={Services} />
              <Drawer.Screen name="Courses" component={Courses} />
              <Drawer.Screen name="CourseEditor" component={CourseEditor} />
              <Drawer.Screen name="Analytics" component={Analytics} />
              <Drawer.Screen name="ServiceInfo" component={ServiceInfo} />
              <Drawer.Screen name="ServiceEditor" component={ServiceEditor} />
            </Drawer.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </UserStorage>
    );
}
