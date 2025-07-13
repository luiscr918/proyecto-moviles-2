import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { perfilStyle } from "../styles/perfilStyle";
import { supabase } from "../supabase/Config";
import { ModalEditarPerfil } from "../components/ModalEditarPerfil";
import { CommonActions, useNavigation } from "@react-navigation/native";
interface Emprendedor {
  uid: string;
  cedula: string;
  nombre_completo: string;
  correo: string;
  telefono: string;
}
export const PerfilScreen = () => {
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
  }, [emprendedor]);

  const onEditar = async (campo: string, valor: string) => {
    const { error } = await supabase
      .from("emprendedor")
      .update({ [campo]: valor })
      .eq("uid", emprendedor?.uid);
    if (!error) {
      Alert.alert("Exito", "Se actualizo correctamente");
    } else {
      Alert.alert("Error", error.message);
    }
  };
  //modal
  const [visible, setVisible] = useState(false);
  const [campo, setcampo] = useState("");
  const abrirModal = (valor: string) => {
    setVisible(true);
    setcampo(valor);
  };
  //cerrar sesion
  const navigation = useNavigation();
  const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      Alert.alert("Hasta pronto", "Cerraste sesión correctamente");
      navigation.dispatch(CommonActions.navigate({ name: "Login" }));
    } else {
      Alert.alert("Error al cerrar sesion", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#000000", "#071a40"]}
        style={perfilStyle.container}
      >
        <ScrollView contentContainerStyle={perfilStyle.scroll}>
          <Text style={perfilStyle.title}>Mi Perfil</Text>
          {/* este modal se activa o desactiva segun visible */}
          <ModalEditarPerfil
            visible={visible}
            onClose={setVisible}
            campo={campo}
            editar={onEditar}
          />

          <View style={perfilStyle.fieldRow}>
            <Text style={perfilStyle.label}>Nombre completo</Text>
            <View style={perfilStyle.valueRow}>
              <Text style={perfilStyle.value}>
                {emprendedor?.nombre_completo}
              </Text>
              <TouchableOpacity
                onPress={() => abrirModal("nombre_completo")}
                style={perfilStyle.editBtn}
              >
                <Feather name="edit-3" size={22} color="#0C86FF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={perfilStyle.fieldRow}>
            <Text style={perfilStyle.label}>Correo electrónico</Text>
            <View style={perfilStyle.valueRow}>
              <Text style={perfilStyle.value}>{emprendedor?.correo}</Text>
            </View>
          </View>

          <View style={perfilStyle.fieldRow}>
            <Text style={perfilStyle.label}>Número de teléfono</Text>
            <View style={perfilStyle.valueRow}>
              <Text style={perfilStyle.value}>{emprendedor?.telefono}</Text>
              <TouchableOpacity
                onPress={() => abrirModal("telefono")}
                style={perfilStyle.editBtn}
              >
                <Feather name="edit-3" size={22} color="#0C86FF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={perfilStyle.fieldRow}>
            <Text style={perfilStyle.label}>Cedula</Text>
            <View style={perfilStyle.valueRow}>
              <Text style={perfilStyle.value}>{emprendedor?.cedula}</Text>
              <TouchableOpacity
                onPress={() => abrirModal("cedula")}
                style={perfilStyle.editBtn}
              >
                <Feather name="edit-3" size={22} color="#0C86FF" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={cerrarSesion} style={perfilStyle.button}>
            <Text style={perfilStyle.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};
