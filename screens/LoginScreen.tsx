import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Reutilizables } from "../styles/reutilizables";

export const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={[Reutilizables.container, styles.inner]}>
      <Text style={styles.title}>Bienvenido</Text>

      {/* simular inicio de sesión */}
      <View style={styles.buttonContainer}>
        <Button
          onPress={() =>
            navigation.dispatch(CommonActions.navigate({ name: "Principal" }))
          }
          title="Iniciar Sesión"
          color="#0C86FF"
        />
      </View>

      {/* simular registro de usuario-emprendedor */}
      <View style={styles.buttonContainer}>
        <Button
          onPress={() =>
            navigation.dispatch(CommonActions.navigate({ name: "Registro" }))
          }
          title="Registrarse"
          color="#0C86FF"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inner: {
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    color: "#0C86FF",
    fontWeight: "bold",
    marginBottom: 40,
  },
  buttonContainer: {
    marginVertical: 10,
    width: "100%",
  },
});
