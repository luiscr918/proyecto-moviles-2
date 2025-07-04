import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { perfilStyle } from "../styles/perfilStyle";

export const PerfilScreen = () => {
  // Datos quemados (como ejemplo)
  const usuario = {
    nombre: "Luis Castillo",
    correo: "luis.castillo@mail.com",
    telefono: "+593 987654321",
    contrasenia: "*******",
  };

  const onEditar = (campo: string) => {
    Alert.alert("Editar", `Quieres editar el campo: ${campo}`);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#000000", "#071a40"]}
        style={perfilStyle.container}
      >
        <ScrollView contentContainerStyle={perfilStyle.scroll}>
          <Text style={perfilStyle.title}>Mi Perfil</Text>

          <View style={perfilStyle.fieldRow}>
            <Text style={perfilStyle.label}>Nombre completo</Text>
            <View style={perfilStyle.valueRow}>
              <Text style={perfilStyle.value}>{usuario.nombre}</Text>
              <TouchableOpacity
                onPress={() => onEditar("Nombre completo")}
                style={perfilStyle.editBtn}
              >
                <Feather name="edit-3" size={22} color="#0C86FF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={perfilStyle.fieldRow}>
            <Text style={perfilStyle.label}>Correo electrónico</Text>
            <View style={perfilStyle.valueRow}>
              <Text style={perfilStyle.value}>{usuario.correo}</Text>
              <TouchableOpacity
                onPress={() => onEditar("Correo electrónico")}
                style={perfilStyle.editBtn}
              >
                <Feather name="edit-3" size={22} color="#0C86FF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={perfilStyle.fieldRow}>
            <Text style={perfilStyle.label}>Número de teléfono</Text>
            <View style={perfilStyle.valueRow}>
              <Text style={perfilStyle.value}>{usuario.telefono}</Text>
              <TouchableOpacity
                onPress={() => onEditar("Número de teléfono")}
                style={perfilStyle.editBtn}
              >
                <Feather name="edit-3" size={22} color="#0C86FF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={perfilStyle.fieldRow}>
            <Text style={perfilStyle.label}>Contraseña</Text>
            <View style={perfilStyle.valueRow}>
              <Text style={perfilStyle.value}>{usuario.contrasenia}</Text>
              <TouchableOpacity
                onPress={() => onEditar("Contraseña")}
                style={perfilStyle.editBtn}
              >
                <Feather name="edit-3" size={22} color="#0C86FF" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={perfilStyle.button}>
            <Text style={perfilStyle.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};
