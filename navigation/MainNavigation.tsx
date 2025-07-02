import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import EmprendedorScreen from "../screens/EmprendedorScreen";
import RegistroScreen from "../screens/RegistroScreen";
const Tab = createBottomTabNavigator();
const Draw = createDrawerNavigator();

const MyTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Emprendedores" component={MyDraw} />
    </Tab.Navigator>
  );
};
const MyDraw = () => {
  return (
    <Draw.Navigator>
      <Draw.Screen name="Emprendedor" component={EmprendedorScreen} />
      <Draw.Screen name="Registro" component={RegistroScreen} />
    </Draw.Navigator>
  );
};

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <MyTab />
    </NavigationContainer>
  );
};
