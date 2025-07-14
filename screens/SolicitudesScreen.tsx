import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { Reutilizables } from "../styles/reutilizables";
import { solicitudesStyles } from "../styles/solicitudesStyles";
import { supabase } from "../supabase/Config";
import { ListaSolicitudes } from "../components/ListaSolicitudes";
export interface Solicitudes {
  id_solicitud: number;
  uid_cliente: string;
  id_servicio: number;
  estado: string;
  total: number;
  cantidad:number;
}

export const SolicitudesScreen = () => {
  const [solicitudesClientes, setSolicitudesClientes] =
    useState<Solicitudes[]>();
  //TRAER TODAS LAS SOLICITUDES DE LOS CLIENTES
  const allSolicitudes = async () => {
    const { data, error } = await supabase.from("solicitud").select("*");
    
    if (!error) {
      setSolicitudesClientes(data);
    } else {
      Alert.alert("Error al traer las solicitudes", error.message);
    }
  };
  useEffect(() => {
    allSolicitudes();
  }, []);

  return (
    <SafeAreaView>
      <Text style={solicitudesStyles.title}>Solicitudes de Clientes</Text>

      <FlatList
        data={solicitudesClientes}
        contentContainerStyle={{ paddingBottom: 60 }}
        renderItem={({ item }) => (<ListaSolicitudes {...item}/>)}
      />
    </SafeAreaView>
  );
};
