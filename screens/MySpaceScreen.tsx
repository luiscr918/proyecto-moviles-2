import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const MySpaceScreen = () => {
  const emprendimientosPublicados = 4;
  const solicitudesRecibidas = 12;
  const valoracionPromedio = 4.8;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#000000", "#071a40"]} style={styles.container}>
        <Text style={styles.title}>Mi Espacio</Text>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Emprendimientos publicados</Text>
          <Text style={styles.value}>{emprendimientosPublicados}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Solicitudes recibidas</Text>
          <Text style={styles.value}>{solicitudesRecibidas}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Valoración promedio</Text>
          <Text style={styles.value}>
            {valoracionPromedio} / 5 <Text style={styles.star}>⭐</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ver más detalles</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0C86FF",
    marginBottom: 40,
  },
  infoBlock: {
    marginBottom: 30,
    alignItems: "center",
  },
  label: {
    fontSize: 20,
    color: "#aaa",
    marginBottom: 6,
  },
  value: {
    fontSize: 36,
    fontWeight: "700",
    color: "#0C86FF",
  },
  star: {
    color: "#FFD700",
  },
  button: {
    backgroundColor: "#0C86FF",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 35,
    marginTop: 30,
    shadowColor: "#0C86FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
