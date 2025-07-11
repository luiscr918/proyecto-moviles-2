import React, { useState } from "react";
import { Alert, Button, Image, Text, TextInput, View } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Reutilizables } from "../styles/reutilizables";
import { loginStyles } from "../styles/loginStyles";
import { supabase } from "../supabase/Config";

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  //funcion para iniciar sesion
  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: contrasenia,
    });
    if (data.user != null) {
      navigation.dispatch(CommonActions.navigate({ name: "Principal" }));
      setCorreo("");
      setContrasenia("");
    } else {
      Alert.alert("No se pudo iniciar sesion", error?.message);
    }
  };
  return (
    <View style={[Reutilizables.container, loginStyles.inner]}>
      <Text style={loginStyles.title}>Welcome to StartUps Partners</Text>
      <View style={loginStyles.imageCircle}>
        <Image
          source={require("../assets/imgs/circular.jpeg")}
          style={loginStyles.image}
        />
      </View>
      {/* campos de login */}
      <TextInput
        style={loginStyles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        cursorColor="#0C86FF"
        value={correo}
        onChangeText={setCorreo}
      />
      <TextInput
        style={loginStyles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        cursorColor="#0C86FF"
        value={contrasenia}
        onChangeText={setContrasenia}
      />
      {/* botón de inicio de sesión */}
      <View style={loginStyles.buttonContainer}>
        <Button onPress={login} title="Iniciar Sesión" color="#0C86FF" />
      </View>
      {/* botón de registro */}
      <Text
        style={loginStyles.textRegister}
        onPress={() =>
          navigation.dispatch(CommonActions.navigate({ name: "Registro" }))
        }
      >
        ¿No tienes una cuenta? registrate aquí
      </Text>
    </View>
  );
};
