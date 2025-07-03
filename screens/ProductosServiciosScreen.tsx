import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Reutilizables } from "../styles/reutilizables";

export const ProductosServiciosScreen = () => {
  // Datos quemados
  const producto = {
    nombre: "Café artesanal",
    tipo: "Producto",
    descripcion: "Café orgánico de alta calidad, tostado localmente.",
    precio: "5.00",
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Agregar Producto o Servicio</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#aaa"
          value={producto.nombre}
          editable={false}
        />

        <Text style={styles.label}>Tipo</Text>
        <TextInput
          style={styles.input}
          placeholder="Tipo"
          placeholderTextColor="#aaa"
          value={producto.tipo}
          editable={false}
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Descripción"
          placeholderTextColor="#aaa"
          value={producto.descripcion}
          editable={false}
          multiline
        />

        <Text style={styles.label}>Precio</Text>
        <TextInput
          style={styles.input}
          placeholder="Precio"
          placeholderTextColor="#aaa"
          value={producto.precio}
          editable={false}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0C86FF",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    color: "#aaa",
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#111",
    color: "#fff",
    borderColor: "#0C86FF",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 18,
    fontSize: 18,
    width: "100%",
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
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
});
