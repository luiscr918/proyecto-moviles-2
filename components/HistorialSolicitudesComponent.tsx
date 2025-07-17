import { Alert, Image, StyleSheet, Text, View } from "react-native";
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

export const HistorialSolicitudesComponent = (item: Solicitudes) => {
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
  }, [item]);

  const getColorForEstado = () => {
    if (item.estado === "SOLICITADO") return "#61ead1";
    else if (item.estado === "APROBADO") return "#24ff50";
    else return "#e84f4f"; // RECHAZADO u otro
  };

  return (
    <View
      style={{
        ...solicitudesStyles.solicitudItem,
        borderColor: "#0df2c9",
        borderWidth: 2,
      }}
    >
      <View style={solicitudesStyles.row}>
        {cliente?.imagen && (
          <Image
            source={{
              uri:
                cliente.imagen ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
            style={solicitudesStyles.imagenCliente}
          />
        )}
        <View style={solicitudesStyles.solicitudHeader}>
          <Text style={solicitudesStyles.cliente}>
            Cliente: {cliente?.nombre_completo}
          </Text>
          <Text
            style={solicitudesStyles.cliente}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            Servicio: {servicio?.nombre}
          </Text>
          <Text style={solicitudesStyles.pedido}>
            Estado:
            <Text style={{ color: getColorForEstado() }}> {item.estado}</Text>
          </Text>
          <Text style={solicitudesStyles.pedido}>
            Cantidad: {item.cantidad}
          </Text>
          <Text style={solicitudesStyles.pedido}>Total: {item.total}</Text>
        </View>
      </View>
    </View>
  );
};
