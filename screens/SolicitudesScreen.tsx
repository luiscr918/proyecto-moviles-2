import React, { useEffect, useState } from "react";
import { Text, View, FlatList, SafeAreaView, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { solicitudesStyles } from "../styles/solicitudesStyles";
import { supabase } from "../supabase/Config";
import { ListaSolicitudes } from "../components/ListaSolicitudes";

export interface Solicitudes {
  id_solicitud: number;
  uid_cliente: string;
  id_servicio: number;
  estado: string;
  total: number;
  cantidad: number;
}

export const SolicitudesScreen = () => {
  const [solicitudesClientes, setSolicitudesClientes] = useState<Solicitudes[]>(
    []
  );
  const [loading, setLoading] = useState(true); // Estado para controlar si está cargando

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
        setLoading(false); // Terminamos la carga aunque no haya solicitudes
        return;
      }

      const { data: solicitudes, error: solError } = await supabase
        .from("solicitud")
        .select("*")
        .in("id_servicio", idsServicios);

      if (solError) throw new Error(solError.message);
      setSolicitudesClientes(solicitudes);
      setLoading(false); // Terminamos la carga
    } catch (e: any) {
      setLoading(false); // Terminamos la carga
      Alert.alert("Error al filtrar solicitudes", e.message);
    }
  };

  useEffect(() => {
    obtenerSolicitudesFiltradas();
  }, [solicitudesClientes]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={solicitudesStyles.title}>Solicitudes Pendientes</Text>

      {/* Muestra el ActivityIndicator mientras se cargan las solicitudes */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0C86FF" />
        </View>
      ) : (
        <FlatList
          data={solicitudesClientes}
          contentContainerStyle={{ paddingBottom: 60 }}
          renderItem={({ item }) => <ListaSolicitudes {...item} />}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro para la carga
  },
});
