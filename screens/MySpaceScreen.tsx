import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { myspaceStyle } from "../styles/myspaceStyles";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { supabase } from "../supabase/Config";
import { Emprendimiento } from "./EmprendimientosServiceScreen";
import { Solicitudes } from "./SolicitudesScreen";

export const MySpaceScreen = () => {
  const [empTotales, setEmpTotales] = useState<Emprendimiento[]>();
  const navigation = useNavigation();
  //traer el total de emprendimientos del emprendedor:
  const emprendimientosTotales = async () => {
    //primero traigo el emprendedor que inicio sesión
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      //traigo los emprendimientos que tiene el emprendedor que inicio sesion1
      const { data, error } = await supabase
        .from("emprendimiento")
        .select("*")
        .eq("uid_emprendedor", user.id);
      if (!error) {
        setEmpTotales(data);
      } else {
        Alert.alert("Error al traer sus emprendimientos", error.message);
      }
    }
  };
  useEffect(() => {
    emprendimientosTotales();
  }, []);
  //Logica para solicitudes totales
    const [solicitudesClientes, setSolicitudesClientes] = useState<Solicitudes[]>([]);
  
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
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#000000", "#071a40"]}
        style={myspaceStyle.container}
      >
        <Text style={myspaceStyle.title}>Mi Espacio</Text>

        <View style={myspaceStyle.infoBlock}>
          <Text style={myspaceStyle.label}>Emprendimientos publicados</Text>
          <Text style={myspaceStyle.value}>{empTotales?.length}</Text>
        </View>

        <View style={myspaceStyle.infoBlock}>
          <Text style={myspaceStyle.label}>Solicitudes recibidas</Text>
          <Text style={myspaceStyle.value}>{solicitudesClientes.length}</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={myspaceStyle.button}
        >
          <Text style={myspaceStyle.buttonText}>Ver más detalles</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};
