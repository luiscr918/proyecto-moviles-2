import React, { useEffect, useState } from "react";
import { Text, View, FlatList, SafeAreaView, Alert } from "react-native";
import { solicitudesStyles } from "../styles/solicitudesStyles";
import { supabase } from "../supabase/Config";
import { Solicitudes } from "./SolicitudesScreen";
import { HistorialSolicitudesComponent } from "../components/HistorialSolicitudesComponent";

export const HistorialSolicitudesScreen = () => {
  const [solicitudesClientes, setSolicitudesClientes] = useState<Solicitudes[]>(
    []
  );

  // Paso 1: Obtener todos los servicios del emprendedor actual
  const obtenerServiciosDelEmprendedor = async (uidEmprendedor: string) => {
    const { data: emprendimientos, error: empError } = await supabase
      .from("emprendimiento")
      .select("ruc")
      .eq("uid_emprendedor", uidEmprendedor);

    if (empError) throw new Error(empError.message);

    const rucs = emprendimientos.map((e) => e.ruc);

    const { data: servicios, error: servError } = await supabase
      .from("servicio")
      .select("id_servicio")
      .in("ruc_emprendimiento", rucs);

    if (servError) throw new Error(servError.message);

    return servicios.map((s) => s.id_servicio);
  };

  // Paso 2: Obtener las solicitudes con esos id_servicio
  const obtenerSolicitudesFiltradas = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      Alert.alert("Error", "No se pudo traer sus datos");
      return;
    }

    try {
      const idsServicios = await obtenerServiciosDelEmprendedor(user.id);

      if (idsServicios.length === 0) {
        setSolicitudesClientes([]); // No hay servicios, entonces no hay solicitudes
        return;
      }

      const { data: solicitudes, error: solError } = await supabase
        .from("solicitud")
        .select("*")
        .in("id_servicio", idsServicios);

      if (solError) throw new Error(solError.message);

      setSolicitudesClientes(solicitudes);
    } catch (e: any) {
      Alert.alert("Error al filtrar solicitudes", e.message);
    }
  };

  useEffect(() => {
    obtenerSolicitudesFiltradas();
  }, [solicitudesClientes]);

  return (
    <SafeAreaView>
      <Text style={solicitudesStyles.title}>Historial de Solicitudes</Text>
      <FlatList
        data={solicitudesClientes}
        contentContainerStyle={{ paddingBottom: 60 }}
        renderItem={({ item }) => <HistorialSolicitudesComponent {...item} />}
      />
    </SafeAreaView>
  );
};
