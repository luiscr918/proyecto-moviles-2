import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

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
      <LinearGradient colors={["#000000", "#071a40"]} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>Mi Perfil</Text>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Nombre completo</Text>
            <View style={styles.valueRow}>
              <Text style={styles.value}>{usuario.nombre}</Text>
              <TouchableOpacity
                onPress={() => onEditar("Nombre completo")}
                style={styles.editBtn}
              >
                <Feather name="edit-3" size={22} color="#0C86FF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Correo electrónico</Text>
            <View style={styles.valueRow}>
              <Text style={styles.value}>{usuario.correo}</Text>
              <TouchableOpacity
                onPress={() => onEditar("Correo electrónico")}
                style={styles.editBtn}
              >
                <Feather name="edit-3" size={22} color="#0C86FF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Número de teléfono</Text>
            <View style={styles.valueRow}>
              <Text style={styles.value}>{usuario.telefono}</Text>
              <TouchableOpacity
                onPress={() => onEditar("Número de teléfono")}
                style={styles.editBtn}
              >
                <Feather name="edit-3" size={22} color="#0C86FF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.valueRow}>
              <Text style={styles.value}>{usuario.contrasenia}</Text>
              <TouchableOpacity
                onPress={() => onEditar("Contraseña")}
                style={styles.editBtn}
              >
                <Feather name="edit-3" size={22} color="#0C86FF" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  scroll: {
    paddingBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0C86FF",
    marginBottom: 30,
    textAlign: "center",
  },
  fieldRow: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 6,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#111",
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 15,
  },
  value: {
    fontSize: 18,
    color: "#fff",
    flexShrink: 1,
  },
  editBtn: {
    paddingLeft: 15,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#0C86FF",
    paddingVertical: 16,
    borderRadius: 35,
    alignItems: "center",
    shadowColor: "#0C86FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
});
