import React from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { myspaceStyle } from "../styles/myspaceStyles";

export const MySpaceScreen = () => {
  const emprendimientosPublicados = 4;
  const solicitudesRecibidas = 12;
  const valoracionPromedio = 4.8;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#000000", "#071a40"]}
        style={myspaceStyle.container}
      >
        <Text style={myspaceStyle.title}>Mi Espacio</Text>

        <View style={myspaceStyle.infoBlock}>
          <Text style={myspaceStyle.label}>Emprendimientos publicados</Text>
          <Text style={myspaceStyle.value}>{emprendimientosPublicados}</Text>
        </View>

        <View style={myspaceStyle.infoBlock}>
          <Text style={myspaceStyle.label}>Solicitudes recibidas</Text>
          <Text style={myspaceStyle.value}>{solicitudesRecibidas}</Text>
        </View>

        <View style={myspaceStyle.infoBlock}>
          <Text style={myspaceStyle.label}>Valoración promedio</Text>
          <Text style={myspaceStyle.value}>
            {valoracionPromedio} / 5 <Text style={myspaceStyle.star}>⭐</Text>
          </Text>
        </View>

        <TouchableOpacity style={myspaceStyle.button}>
          <Text style={myspaceStyle.buttonText}>Ver más detalles</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};
