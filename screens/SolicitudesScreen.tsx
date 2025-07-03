import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Reutilizables } from "../styles/reutilizables";

const solicitudesClientes = [
  {
    id: "1",
    cliente: "Carlos Gómez",
    fecha: "2025-07-02",
    pedido: "20 chocolates oscuros con relleno de avellana",
    estado: "Pendiente",
  },
  {
    id: "2",
    cliente: "Ana Martínez",
    fecha: "2025-07-01",
    pedido: "15 cajas de bombones surtidos",
    estado: "Pendiente",
  },
  {
    id: "3",
    cliente: "Juan Ramírez",
    fecha: "2025-06-30",
    pedido: "5 chocolates personalizados con mensaje",
    estado: "Pendiente",
  },
];

export const SolicitudesScreen = () => {
  return (
    <SafeAreaView style={Reutilizables.container}>
      <Text style={styles.title}>Solicitudes de Clientes</Text>

      <FlatList
        data={solicitudesClientes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 60 }}
        renderItem={({ item }) => (
          <View style={styles.solicitudItem}>
            <View style={styles.solicitudHeader}>
              <Text style={styles.cliente}>{item.cliente}</Text>
              <Text style={styles.fecha}>
                {new Date(item.fecha).toLocaleDateString()}
              </Text>
            </View>
            <Text style={styles.pedido}>{item.pedido}</Text>
            <View style={styles.botonesRow}>
              <TouchableOpacity style={[styles.button, styles.acceptBtn]}>
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.rejectBtn]}>
                <Text style={styles.buttonText}>Rechazar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0C86FF",
    textAlign: "center",
    marginVertical: 20,
  },
  solicitudItem: {
    backgroundColor: "#111",
    borderRadius: 15,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  solicitudHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cliente: {
    color: "#0C86FF",
    fontWeight: "700",
    fontSize: 16,
  },
  fecha: {
    color: "#666",
    fontSize: 13,
  },
  pedido: {
    color: "#eee",
    fontSize: 15,
    marginBottom: 12,
  },
  botonesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 5,
  },
  acceptBtn: {
    backgroundColor: "#34d399", // verde
  },
  rejectBtn: {
    backgroundColor: "#ef4444", // rojo
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
