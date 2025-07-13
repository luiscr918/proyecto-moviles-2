import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/Config";
import { ListaServicios } from "./ListaServicios";
interface Props {
  visible: boolean;
  onClose: (valor: boolean) => void;
  ruc: string; // viene del emprendimiento seleccionado
  nombreEmprendimiento: string; //nombre del emprendiiento
}
export interface Servicio {
  idServicio: string;
  rucEmprendimiento: string;
  nombre: string;
  descripcion: string;
  precio: number;
}
export const ModalServicios = ({
  visible,
  onClose,
  ruc,
  nombreEmprendimiento,
}: Props) => {
  //aqui guardare los servicios de un emprendimiento
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const cerrarModal = () => {
    onClose(false);
  };

  const leerServicios = async () => {
    const { data, error } = await supabase
      .from("servicio")
      .select("*")
      .eq("ruc_emprendimiento", ruc);

    if (!error) {
      setServicios(data);
    } else {
      Alert.alert("Error al traer los Servicios", error.message);
    }
  };
  useEffect(() => {
    leerServicios();
  }, []);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Servicios de: {nombreEmprendimiento}</Text>
          <FlatList
            data={servicios}
            renderItem={({ item }) => <ListaServicios {...item} />}
          />
          <TouchableOpacity onPress={cerrarModal}>
            <Text style={styles.cancelar}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: "#0C86FF",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0C86FF",
    marginBottom: 20,
    textAlign: "center",
  },
  cancelar: {
    color: "#f04c4c",
    textAlign: "center",
    fontSize: 20,
  },
});
