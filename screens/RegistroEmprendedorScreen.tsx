import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { formEmprendedor } from "../styles/formEmprendedor";

export const RegistroEmprendedorScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#000000", "#071a40"]}
        style={formEmprendedor.container}
      >
        <ScrollView contentContainerStyle={formEmprendedor.scroll}>
          <Text style={formEmprendedor.title}>Registro de Emprendedor</Text>

          <TextInput
            style={formEmprendedor.input}
            placeholder="Nombre completo"
            placeholderTextColor="#aaa"
            cursorColor="#0C86FF"
          />

          <TextInput
            style={formEmprendedor.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            cursorColor="#0C86FF"
          />

          <TextInput
            style={formEmprendedor.input}
            placeholder="Número de teléfono"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
            cursorColor="#0C86FF"
          />

          <TextInput
            style={formEmprendedor.input}
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            secureTextEntry
            cursorColor="#0C86FF"
          />

          <TextInput
            style={formEmprendedor.input}
            placeholder="Confirmar contraseña"
            placeholderTextColor="#aaa"
            secureTextEntry
            cursorColor="#0C86FF"
          />

          <TouchableOpacity
            style={formEmprendedor.button}
            onPress={() =>
              navigation.dispatch(CommonActions.navigate({ name: "Login" }))
            }
          >
            <Text style={formEmprendedor.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};
