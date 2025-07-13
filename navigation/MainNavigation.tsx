import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
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
import { AllServices } from "../screens/AllServices";
import { EmprendimientosServiceScreen } from "../screens/EmprendimientosServiceScreen";

const Tab = createBottomTabNavigator();
const Draw = createDrawerNavigator();
const Stack = createStackNavigator();
const Top = createMaterialTopTabNavigator();
const COLOR_FONDO = "#000";
const COLOR_PRIMARIO = "#0C86FF";
const COLOR_TEXTO = "#fff";

const MyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: COLOR_FONDO },
        headerTintColor: COLOR_TEXTO,
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
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
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLOR_FONDO,
          borderTopColor: COLOR_PRIMARIO,
        },
        tabBarActiveTintColor: COLOR_PRIMARIO,
        tabBarInactiveTintColor: "#888",
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={RegistroEmprendimientoScreen}
        options={{
          tabBarIcon: () => (
            <View style={styles.addButton}>
              <FontAwesome6 name="add" size={28} color={COLOR_PRIMARIO} />
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="My Space"
        component={MyDraw}
        options={{
          tabBarIcon: ({ color }) => (
            <Foundation name="torso-business" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MyDraw = () => {
  return (
    <Draw.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLOR_FONDO },
        headerTintColor: COLOR_TEXTO,
        drawerStyle: { backgroundColor: COLOR_FONDO },
        drawerActiveTintColor: COLOR_PRIMARIO,
        drawerInactiveTintColor: COLOR_TEXTO,
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Draw.Screen name="Mi Espacio" component={MySpaceScreen} />
      <Draw.Screen name="Perfil" component={PerfilScreen} />
      <Draw.Screen name="Mis Emprendimientos y Servicios" component={MyTop} />
      <Draw.Screen name="Solicitudes" component={SolicitudesScreen} />
      <Draw.Screen name="Reseñas" component={ReseniasScreen} />
    </Draw.Navigator>
  );
};
const MyTop = () => {
  return (
    <Top.Navigator>
      <Top.Screen name="Mis Emprendimientos" component={AllServices} />
      <Top.Screen
        name="Agregar Servicio"
        component={EmprendimientosServiceScreen}
      />
    </Top.Navigator>
  );
};

export const MainNavigation = () => {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: COLOR_FONDO,
          card: COLOR_FONDO,
          text: COLOR_TEXTO,
          primary: COLOR_PRIMARIO,
          border: COLOR_PRIMARIO,
          notification: COLOR_PRIMARIO,
        },
      }}
    >
      <MyStack />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLOR_TEXTO,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: COLOR_TEXTO,
    marginBottom: 20, // Para sobresalir
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
});
