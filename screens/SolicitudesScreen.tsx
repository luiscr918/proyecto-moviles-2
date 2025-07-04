import React from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Reutilizables } from "../styles/reutilizables";
import { solicitudesStyles } from "../styles/solicitudesStyles";

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
      <Text style={solicitudesStyles.title}>Solicitudes de Clientes</Text>

      <FlatList
        data={solicitudesClientes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 60 }}
        renderItem={({ item }) => (
          <View style={solicitudesStyles.solicitudItem}>
            <View style={solicitudesStyles.solicitudHeader}>
              <Text style={solicitudesStyles.cliente}>{item.cliente}</Text>
              <Text style={solicitudesStyles.fecha}>
                {new Date(item.fecha).toLocaleDateString()}
              </Text>
            </View>
            <Text style={solicitudesStyles.pedido}>{item.pedido}</Text>
            <View style={solicitudesStyles.botonesRow}>
              <TouchableOpacity
                style={[solicitudesStyles.button, solicitudesStyles.acceptBtn]}
              >
                <Text style={solicitudesStyles.buttonText}>Enviar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[solicitudesStyles.button, solicitudesStyles.rejectBtn]}
              >
                <Text style={solicitudesStyles.buttonText}>Rechazar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
