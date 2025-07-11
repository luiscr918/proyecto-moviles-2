import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Emprendimiento } from "../screens/EmprendimientosServiceScreen";
import { ModalNuevoServicio } from "./ProductosServiciosScreen";

export const EmprendimientosComponent = (item: Emprendimiento) => {
  //llamar modal para abrirlo
  const [visible, setVisible] = useState(false);
  const abrirModal = () => {
    setVisible(true);
  };
  return (
    <>
      <ModalNuevoServicio
        visible={visible}
        onClose={setVisible}
        ruc={item.ruc}
      />
      <TouchableOpacity onPress={abrirModal} style={styles.card}>
        <Text style={styles.cardTitle}>{item.nombre_emprendimiento}</Text>
        <Text style={styles.cardText}>📂 Categoría: {item.categoria}</Text>
        <Text style={styles.cardText}>📝 {item.descripcion}</Text>
        {item.direccion ? (
          <Text style={styles.cardText}>📍 Dirección: {item.direccion}</Text>
        ) : null}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  cardText: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 4,
  },
  card: {
    backgroundColor: "#111",
    borderColor: "#0C86FF",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#0C86FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
});
