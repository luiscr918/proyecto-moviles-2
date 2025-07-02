import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Reutilizables } from "../styles/reutilizables";

export const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("../assets/imgs/fondoLogin.png")}
      style={Reutilizables.container}
    >
      <Text>LoginScreen</Text>
      {/* simular inicio sesion */}
      <Button
        onPress={() =>
          navigation.dispatch(CommonActions.navigate({ name: "Principal" }))
        }
        title="Iniciar Sesion"
      />
      {/* simular registro de usuario-emprendedor */}
      <Button
        onPress={() =>
          navigation.dispatch(CommonActions.navigate({ name: "Registro" }))
        }
        title="Registrarse"
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({});
