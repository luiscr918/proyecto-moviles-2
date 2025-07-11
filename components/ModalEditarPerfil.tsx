import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/Config";
interface Props {
  visible: boolean;
  onClose: (valor: boolean) => void;
  campo: string;
  editar: (campo: string, ingreso: string) => void;
}
export const ModalEditarPerfil = ({
  visible,
  onClose,
  editar,
  campo,
}: Props) => {
  const [valor, setValor] = useState("");
  const cerrarModal = () => {
    onClose(false);
    setValor("");
  };
  const onEditar = async () => {
    editar(campo, valor);
    cerrarModal();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.titulo}>Editar Perfil</Text>
          <TextInput
            style={styles.input}
            placeholder="Nuevo valor"
            value={valor}
            onChangeText={setValor}
          />
          <TouchableOpacity style={styles.boton} onPress={onEditar}>
            <Text style={styles.textoBoton}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonCerrar} onPress={cerrarModal}>
            <Text style={styles.textoCerrar}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#0C86FF",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#0C86FF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 18,
    fontSize: 16,
    color: "#222",
  },
  boton: {
    backgroundColor: "#0C86FF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  botonCerrar: {
    paddingVertical: 8,
    alignItems: "center",
    width: "100%",
  },
  textoCerrar: {
    color: "#0C86FF",
    fontSize: 15,
  },
});
