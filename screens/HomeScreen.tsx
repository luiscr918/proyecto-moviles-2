import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { homeStyle } from "../styles/homeStyle";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { supabase } from "../supabase/Config";
interface Emprendedor {
  uid: string;
  cedula: string;
  nombre_completo: string;
  correo: string;
  telefono: string;
}
export const HomeScreen = () => {
  const [emprendedor, setEmprendedor] = useState<Emprendedor>();
  //funcion para traer usuario logeado
  const traerLogeado = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("emprendedor") // de tabla emprendedor
        .select("*") // traigo todos sus datos
        .eq("uid", user.id) // Filtro por el UID que es mi clave primaria
        .single(); // Esperas un solo resultado
      setEmprendedor(data);
    }
  };
  //traera el usuario logeado cada que ejecute el screen
  useEffect(() => {
    traerLogeado();
  }, []);

  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#000000", "#071a40"]}
        style={homeStyle.container}
      >
        <View style={homeStyle.content}>
          <Text style={homeStyle.title}>
            ¡Hola, {emprendedor?.nombre_completo}!
          </Text>

          <Text style={homeStyle.intro}>
            Gestiona y haz crecer tu emprendimiento desde un solo lugar.
          </Text>

          <View style={homeStyle.imageWrapper}>
            <Image
              source={require("../assets/imgs/logoStartUpsPartners.jpeg")}
              style={homeStyle.image}
              resizeMode="cover"
            />
          </View>

          <Text style={homeStyle.quote}>
            "Cree en ti. Cada gran negocio empezó con una pequeña idea."
          </Text>

          <Text style={homeStyle.motivationalText}>
            Hoy es el mejor día para impulsar tu emprendimiento.
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(CommonActions.navigate({ name: "My Space" }))
            }
            style={homeStyle.button}
          >
            <Text style={homeStyle.buttonText}>Explorar mi espacio</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
