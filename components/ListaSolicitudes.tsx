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
export const ListaSolicitudes = (item: Solicitudes) => {
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
  //funcion para rechazar
  const rechazarSolicitud = async () => {
    const { error } = await supabase
      .from("solicitud")
      .update({ estado: "RECHAZADO" })
      .eq("id_solicitud", item.id_solicitud);
      if (error) {
        Alert.alert("ERROR",error.message)
      }
  };
   //funcion para APROBAR
  const aprobarSolicitud = async () => {
    const { error } = await supabase
      .from("solicitud")
      .update({ estado: "APROBADO" })
      .eq("id_solicitud", item.id_solicitud);
      if (error) {
        Alert.alert("ERROR",error.message)
      }
  };

  return (
    <>
      {item.estado === "SOLICITADO" && (
        <View style={solicitudesStyles.solicitudItem}>
          <View style={solicitudesStyles.solicitudHeader}>
            <Text style={solicitudesStyles.cliente}>
              Cliente: {cliente?.nombre_completo}
            </Text>
            <Text style={solicitudesStyles.cliente}>
              Servicio: {servicio?.nombre}
            </Text>
            <Text style={solicitudesStyles.pedido}>Estado: {item.estado}</Text>
            <Text style={solicitudesStyles.pedido}>
              Cantidad: {item.cantidad}
            </Text>
            <Text style={solicitudesStyles.pedido}>Total: {item.total}</Text>
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

const styles = StyleSheet.create({});
