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

export const MySpaceScreen = () => {
  const [empTotales, setEmpTotales] = useState<Emprendimiento[]>();
  const solicitudesRecibidas = 12;
  const valoracionPromedio = 4.8;

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
          <Text style={myspaceStyle.value}>{solicitudesRecibidas}</Text>
        </View>

        <View style={myspaceStyle.infoBlock}>
          <Text style={myspaceStyle.label}>Valoración promedio</Text>
          <Text style={myspaceStyle.value}>
            {valoracionPromedio} / 5 <Text style={myspaceStyle.star}>⭐</Text>
          </Text>
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
