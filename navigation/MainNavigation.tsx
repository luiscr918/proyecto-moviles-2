import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { StyleSheet, View } from "react-native";
import { HomeScreen } from "../screens/HomeScreen";
import { RegistroEmprendimientoScreen } from "../screens/RegistroEmprendimientoScreen";
import { MySpaceScreen } from "../screens/MySpaceScreen";
import { PerfilScreen } from "../screens/PerfilScreen";
import { SolicitudesScreen } from "../screens/SolicitudesScreen";
import { ReseniasScreen } from "../screens/ReseniasScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { RegistroEmprendedorScreen } from "../screens/RegistroEmprendedorScreen";
import { ProductosServiciosScreen } from "../screens/ProductosServiciosScreen";
const Tab = createBottomTabNavigator();
const Draw = createDrawerNavigator();
const Stack = createStackNavigator();
const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegistroEmprendedorScreen} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Principal"
        component={MyTab}
      />
    </Stack.Navigator>
  );
};

const MyTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={{
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <View style={styles.addButton}>
              <FontAwesome6 name="add" size={28} color="black" />
            </View>
          ),
          //metodo para ocultar la palabra "add"
          tabBarLabel: () => null,
        }}
        name="Add"
        component={RegistroEmprendimientoScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Foundation name="torso-business" size={24} color="black" />
          ),
        }}
        name="My Space"
        component={MyDraw}
      />
    </Tab.Navigator>
  );
};
const MyDraw = () => {
  return (
    <Draw.Navigator>
      <Draw.Screen name="Menu" component={MySpaceScreen} />
      <Draw.Screen name="Perfil" component={PerfilScreen} />
      <Draw.Screen
        name="Mis Productos/Servicios"
        component={ProductosServiciosScreen}
      />
      <Draw.Screen name="Solicitudes" component={SolicitudesScreen} />
      <Draw.Screen name="Reseñas" component={ReseniasScreen} />
    </Draw.Navigator>
  );
};

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 20, // Hace que sobresalga
    elevation: 5, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
});
