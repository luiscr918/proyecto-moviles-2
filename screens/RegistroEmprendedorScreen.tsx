import React, { useState, useRef } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  View,
  StyleSheet,
} from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { supabase } from "../supabase/Config";
import { Video, ResizeMode } from "expo-av";

export const RegistroEmprendedorScreen = () => {
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [confContra, setConfContra] = useState("");

  const navigation = useNavigation();
  const videoRef = useRef(null);

  const comprobarContra = () => {
    if (contrasenia === confContra) {
      registrar();
    } else {
      Alert.alert("Error", "Las contraseñas no coinciden");
    }
  };

  const registrar = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: correo,
      password: contrasenia,
    });
    if (data?.user != null) {
      guardar(data.user.id);
      Alert.alert("Éxito", "Registro exitoso");
      navigation.dispatch(CommonActions.navigate({ name: "Login" }));
    } else {
      Alert.alert("Error", error?.message ?? "Error desconocido");
    }
  };

  const guardar = async (uid: string) => {
    const { error } = await supabase.from("emprendedor").insert({
      uid: uid,
      cedula,
      nombre_completo: nombre,
      correo,
      telefono,
    });
    if (error) {
      Alert.alert("Error al guardar datos", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Video de fondo */}
        <Video
          ref={videoRef}
          source={require("../assets/files/videos/fondo.mp4")} // Cambia esta ruta por la ruta correcta de tu video
          style={StyleSheet.absoluteFill}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          isMuted
        />

        {/* Capa con fondo oscuro semi-transparente y formulario */}
        <View style={styles.overlay}>

          <ScrollView contentContainerStyle={styles.scroll}>
            <Text style={styles.title}>Registro de Emprendedor</Text>

            <TextInput
              style={styles.input}
              placeholder="Cedula"
              placeholderTextColor="#aaa"
              cursorColor="#0C86FF"
              onChangeText={setCedula}
              value={cedula}
            />
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor="#aaa"
              cursorColor="#0C86FF"
              onChangeText={setNombre}
              value={nombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              cursorColor="#0C86FF"
              onChangeText={setCorreo}
              value={correo}
            />
            <TextInput
              style={styles.input}
              placeholder="Número de teléfono"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
              cursorColor="#0C86FF"
              onChangeText={setTelefono}
              value={telefono}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#aaa"
              secureTextEntry
              cursorColor="#0C86FF"
              onChangeText={setContrasenia}
              value={contrasenia}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              placeholderTextColor="#aaa"
              secureTextEntry
              cursorColor="#0C86FF"
              onChangeText={setConfContra}
              value={confContra}
            />

            <TouchableOpacity style={styles.button} onPress={comprobarContra}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </ScrollView>
          </View>
        </View>

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  scroll: {
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0C86FF",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    borderColor: "#0C86FF",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginBottom: 20,
    fontSize: 18,
    width: "100%",
    shadowColor: "#0C86FF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  button: {
    backgroundColor: "#0C86FF",
    paddingVertical: 16,
    borderRadius: 35,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    shadowColor: "#0C86FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
});

