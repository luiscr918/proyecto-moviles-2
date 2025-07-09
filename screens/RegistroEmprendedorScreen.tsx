import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { formEmprendedor } from "../styles/formEmprendedor";
import { supabase } from "../supabase/Config";

export const RegistroEmprendedorScreen = () => {
  //datos del emprendedor
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  //contraseña que va a aparte
  const [contrasenia, setContrasenia] = useState("");
  //para la confirmacion
  const [confContra, setConfContra] = useState("");
  const navigation = useNavigation();
  //funcion para comprobar contraseñas
  const comprobarContra = () => {
    let contraOriginal = contrasenia;
    let contraConf = confContra;
    if (contraOriginal === contraConf) {
      registrar();
    } else {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }
  };
  //funcion para registrar con auth
  const registrar = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: correo,
      password: contrasenia,
    });
    if (data.user != null) {
      guardar(data.user.id);
      Alert.alert("Exito", "Registro exitoso");
      navigation.dispatch(CommonActions.navigate({ name: "Login" }));
    } else {
      Alert.alert("Error", error?.message);
    }
  };
  //funcion para guardar los demas datos
  const guardar = async (uid: string) => {
    const { error } = await supabase.from("emprendedor").insert({
      cedula: cedula,
      nombre_completo: nombre,
      correo: correo,
      telefono: telefono,
    });
  };
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
            placeholder="Cedula"
            placeholderTextColor="#aaa"
            cursorColor="#0C86FF"
            onChangeText={setCedula}
          />
          <TextInput
            style={formEmprendedor.input}
            placeholder="Nombre completo"
            placeholderTextColor="#aaa"
            cursorColor="#0C86FF"
            onChangeText={setNombre}
          />

          <TextInput
            style={formEmprendedor.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            cursorColor="#0C86FF"
            onChangeText={setCorreo}
          />

          <TextInput
            style={formEmprendedor.input}
            placeholder="Número de teléfono"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
            cursorColor="#0C86FF"
            onChangeText={setTelefono}
          />

          <TextInput
            style={formEmprendedor.input}
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            secureTextEntry
            cursorColor="#0C86FF"
            onChangeText={setContrasenia}
          />

          <TextInput
            style={formEmprendedor.input}
            placeholder="Confirmar contraseña"
            placeholderTextColor="#aaa"
            secureTextEntry
            cursorColor="#0C86FF"
            onChangeText={setConfContra}
          />

          <TouchableOpacity
            style={formEmprendedor.button}
            onPress={comprobarContra}
          >
            <Text style={formEmprendedor.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};
