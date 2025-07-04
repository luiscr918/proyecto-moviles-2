import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Reutilizables } from "../styles/reutilizables";

export const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={[Reutilizables.container, styles.inner]}>
      <Text style={styles.title}>Welcome to StartUps Partners</Text>
      <View style={styles.imageCircle}>
        <Image
          source={require("../assets/imgs/circular.jpeg")}
          style={styles.image}
        />
      </View>
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
    textAlign:'center'
  },
  buttonContainer: {
    marginVertical: 10,
    width: "100%",
  },
  imageCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    backgroundColor: "#1287FB", // Opcional, para fondo blanco
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
