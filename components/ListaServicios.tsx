import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Servicio } from "./ModalServicios";

export const ListaServicios = (props: Servicio) => {
  const { nombre, descripcion, precio } = props;
  return (
    <View style={{ margin: 10 }}>
      <Text style={styles.texto}>
        <Text style={{ color: "#34d399" }}>Nombre: </Text> {nombre}
      </Text>
      <Text style={styles.texto}>
        <Text style={{ color: "#34d399" }}>Descripción: </Text>
        {descripcion}
      </Text>
      <Text style={styles.texto}>
        <Text style={{ color: "#34d399" }}>Precio Unitario: </Text>
        {precio}
      </Text>
      <View style={styles.linea}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  linea: {
    backgroundColor: "#ffffff",
    height: 1,
    width: "100%",
  },
  texto: {
    color: "#ffffff",
    fontSize: 18,
  },
});
