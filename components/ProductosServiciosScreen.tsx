import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { supabase } from "../supabase/Config";

interface Props {
  visible: boolean;
  onClose: (valor: boolean) => void;
  ruc: string; // viene del emprendimiento seleccionado
}

export const ModalNuevoServicio = ({ visible, onClose, ruc }: Props) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);

  const limpiarCampos = () => {
    setNombre("");
    setDescripcion("");
    setPrecio(0);
  };
  const cerrarModal = () => {
    onClose(false);
  };

  const registrarServicio = async () => {
    if (!nombre || !descripcion || !precio) {
      Alert.alert("Campos incompletos", "Por favor completa todos los campos.");
      return;
    }

    const { error } = await supabase.from("servicio").insert({
      ruc_emprendimiento: ruc,
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
    });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Éxito", "Servicio registrado correctamente");
      cerrarModal();
      limpiarCampos();
    }
  };

  useEffect(() => {
    if (!visible) limpiarCampos();
  }, [visible]);
  const evitarNan = () => {
    if (isNaN(precio)) {
      setPrecio(0);
    }
  };
  useEffect(() => {
    evitarNan();
  }, [precio]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Registrar Servicio</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre del servicio"
            placeholderTextColor="#aaa"
            value={nombre}
            onChangeText={setNombre}
          />

          <TextInput
            style={[styles.input, { height: 90 }]}
            placeholder="Descripción"
            placeholderTextColor="#aaa"
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
          />

          <TextInput
            style={styles.input}
            placeholder="Precio"
            placeholderTextColor="#aaa"
            value={precio.toString()}
            onChangeText={(text) => setPrecio(parseFloat(text))}
            keyboardType="decimal-pad"
          />

          <TouchableOpacity style={styles.button} onPress={registrarServicio}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={cerrarModal}>
            <Text style={styles.cancelar}>Cancelar</Text>
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
  input: {
    backgroundColor: "#222",
    color: "#fff",
    borderColor: "#0C86FF",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#0C86FF",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelar: {
    color: "#0C86FF",
    textAlign: "center",
    fontSize: 15,
  },
});
