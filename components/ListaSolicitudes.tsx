import { Alert, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
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
  imagen: string;
}

export const ListaSolicitudes = (item: Solicitudes) => {
  const [cliente, setcliente] = useState<Cliente>();
  const [servicio, setServicio] = useState<Servicio>();

  const obtenerCliente = async () => {
    const { data, error } = await supabase
      .from("cliente")
      .select("*")
      .eq("uid", item.uid_cliente)
      .single();

    if (!error) {
      setcliente(data);
    } else {
      Alert.alert("Error al traer datos de cliente", error.message);
    }
  };

  useEffect(() => {
    obtenerCliente();
  }, []);

  const obtenerDatosServicio = async () => {
    const { data, error } = await supabase
      .from("servicio")
      .select("*")
      .eq("id_servicio", item.id_servicio)
      .single();

    if (!error) {
      setServicio(data);
    } else {
      Alert.alert("Error al traer datos de servicio", error.message);
    }
  };

  useEffect(() => {
    obtenerDatosServicio();
  }, [item.id_servicio]);

  const rechazarSolicitud = async () => {
    const { error } = await supabase
      .from("solicitud")
      .update({ estado: "RECHAZADO" })
      .eq("id_solicitud", item.id_solicitud);
    if (error) {
      Alert.alert("ERROR", error.message);
    }
  };

  const aprobarSolicitud = async () => {
    const { error } = await supabase
      .from("solicitud")
      .update({ estado: "APROBADO" })
      .eq("id_solicitud", item.id_solicitud);
    if (error) {
      Alert.alert("ERROR", error.message);
    }
  };

  return (
    <>
      {item.estado === "SOLICITADO" && (
        <View style={solicitudesStyles.solicitudItem}>
          <View style={solicitudesStyles.row}>
            {cliente?.imagen && (
              <Image
                source={{ uri: cliente.imagen ?? 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
                style={solicitudesStyles.imagenCliente}
              />
            )}
            <View style={solicitudesStyles.solicitudHeader}>
              <Text style={solicitudesStyles.cliente}>
                Cliente: {cliente?.nombre_completo}
              </Text>
              <Text style={solicitudesStyles.cliente}>
                Servicio: {servicio?.nombre}
              </Text>
              <Text style={solicitudesStyles.pedido}>Estado: {item.estado}</Text>
              <Text style={solicitudesStyles.pedido}>Cantidad: {item.cantidad}</Text>
              <Text style={solicitudesStyles.pedido}>Total: {item.total}</Text>
            </View>
          </View>

          <View style={solicitudesStyles.botonesRow}>
            <TouchableOpacity
              onPress={aprobarSolicitud}
              style={[solicitudesStyles.button, solicitudesStyles.acceptBtn]}
            >
              <Text style={solicitudesStyles.buttonText}>Aprobar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={rechazarSolicitud}
              style={[solicitudesStyles.button, solicitudesStyles.rejectBtn]}
            >
              <Text style={solicitudesStyles.buttonText}>Rechazar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

