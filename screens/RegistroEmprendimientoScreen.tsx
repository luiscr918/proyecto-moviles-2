import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "../supabase/Config";

const tiposEmprendimiento = ["Comida", "Belleza", "Ropa", "Tecnologia"];

export const RegistroEmprendimientoScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  //variables a guardar
  const [ruc, setRuc] = useState("");
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [direccion, setDireccion] = useState("");

  const seleccionarTipo = (tipo: string) => {
    setCategoria(tipo);
    setModalVisible(false);
  };
  //guardar emprendimiento en la base de datos:
  //se guardara con el uid del emprendedor que inicio sesion
  const guardarEmprendimiento = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user != null) {
      const { error } = await supabase.from("emprendimiento").insert({
        ruc: ruc,
        uid_emprendedor: user.id,
        nombre_emprendimiento: nombre,
        categoria: categoria,
        descripcion: descripcion,
        direccion: direccion,
      });
      if (!error) {
        Alert.alert("Exito", "Se registro su emprendimiento correctamente");
        setCategoria("");
        setNombre("");
        setRuc("");
        setDescripcion("");
        setDireccion("");
      } else {
        Alert.alert("Error al registrar emprendimiento", error.message);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#000000", "#071a40"]} style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Registro de Emprendimiento</Text>
          <TextInput
            style={styles.input}
            placeholder="RUC del emprendimiento"
            placeholderTextColor="#aaa"
            cursorColor="#0C86FF"
            value={ruc}
            onChangeText={setRuc}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre del emprendimiento"
            placeholderTextColor="#aaa"
            cursorColor="#0C86FF"
            value={nombre}
            onChangeText={setNombre}
          />

          <TouchableOpacity
            style={styles.input}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: categoria ? "#fff" : "#888" }}>
              {categoria || "Selecciona la categoria de emprendimiento"}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Descripción del emprendimiento"
            placeholderTextColor="#aaa"
            multiline
            cursorColor="#0C86FF"
            value={descripcion}
            onChangeText={setDescripcion}
          />

          <TextInput
            style={styles.input}
            placeholder="Dirección"
            placeholderTextColor="#aaa"
            cursorColor="#0C86FF"
            value={direccion}
            onChangeText={setDireccion}
          />

          <TouchableOpacity
            onPress={guardarEmprendimiento}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Registrar Emprendimiento</Text>
          </TouchableOpacity>
        </ScrollView>

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Selecciona un tipo</Text>
              <FlatList
                data={tiposEmprendimiento}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => seleccionarTipo(item)}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCancelar}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 60,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0C86FF",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#111",
    color: "#fff",
    borderColor: "#0C86FF",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 18,
    fontSize: 18,
    width: "100%",
  },
  button: {
    backgroundColor: "#0C86FF",
    paddingVertical: 16,
    borderRadius: 35,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    shadowColor: "#0C86FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#111",
    padding: 20,
    width: "80%",
    borderRadius: 12,
    borderColor: "#0C86FF",
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    color: "#0C86FF",
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },
  modalItemText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  modalCancelar: {
    marginTop: 15,
    color: "#0C86FF",
    textAlign: "center",
    fontWeight: "bold",
  },
});
