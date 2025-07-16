import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Solicitudes } from "../screens/SolicitudesScreen";
import { solicitudesStyles } from "../styles/solicitudesStyles";
import { supabase } from "../supabase/Config";
import { Servicio } from "./ModalServicios";
interface Cliente {
  uid: string;
  nombre_completo: string;
  correo: string;
  cedula: string;
}
export const HistorialSolicitudesComponent = (item: Solicitudes) => {
  const [cliente, setcliente] = useState<Cliente>();
  const [servicio, setServicio] = useState<Servicio>();
  //OBTENER DATOS DEL CLIENTE CON EL UID
  const obtenerCliente = async () => {
    const { data, error } = await supabase
      .from("cliente")
      .select("*")
      .eq("uid", item.uid_cliente)
      .single(); //  un solo resultado

    if (!error) {
      setcliente(data);
    } else {
      Alert.alert("Error al traer datos de cliente", error.message);
    }
  };
  useEffect(() => {
    obtenerCliente();
  }, []);
  //OBTENER DATOS DEL SERVICIO CON EL ID DEL SERVICIO
  const obtenerDatosServicio = async () => {
    const { data, error } = await supabase
      .from("servicio")
      .select("*")
      .eq("id_servicio", item.id_servicio)
      .single(); //  un solo resultado

    if (!error) {
      setServicio(data);
    } else {
      Alert.alert("Error al traer datos de servicio", error.message);
    }
  };
  useEffect(() => {
    obtenerDatosServicio();
  }, [item]);
  //poner color
  const getColorForEstado = () => {
    // Renamed for clarity
    if (item.estado === "SOLICITADO") {
      return "#61ead1";
    } else if (item.estado === "APROBADO") {
      return "#24ff50";
    } else {
      return "#e84f4f"; // Default color for "RECHAZADO" or any other state
    }
  };
  return (
    <View
      style={{
        ...solicitudesStyles.solicitudItem,
        borderColor: "#0df2c9",
        borderWidth: 2,
      }}
    >
      <View style={solicitudesStyles.solicitudHeader}>
        <Text style={solicitudesStyles.cliente}>
          Cliente: {cliente?.nombre_completo}
        </Text>
        <Text style={solicitudesStyles.cliente}>
          Servicio: {servicio?.nombre}
        </Text>
        <Text style={solicitudesStyles.pedido}>
          Estado:
          <Text style={{ color: getColorForEstado() }}> {item.estado}</Text>
        </Text>
        <Text style={solicitudesStyles.pedido}>Cantidad: {item.cantidad}</Text>
        <Text style={solicitudesStyles.pedido}>Total: {item.total}</Text>
      </View>
    </View>
  );
};
