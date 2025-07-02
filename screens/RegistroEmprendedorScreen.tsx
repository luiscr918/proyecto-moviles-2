import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Reutilizables } from "../styles/reutilizables";
import { CommonActions, useNavigation } from "@react-navigation/native";

export const RegistroEmprendedorScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={Reutilizables.container}>
      <Text>RegistroScreen</Text>
      {/* simular registro exitoso */}
      <Button
        title="Registrarse"
        onPress={() =>
          navigation.dispatch(CommonActions.navigate({ name: "Login" }))
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({});
