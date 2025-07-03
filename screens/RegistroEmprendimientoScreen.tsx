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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const tiposEmprendimiento = ["Servicios", "Productos"];

export const RegistroEmprendimientoScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");

  const seleccionarTipo = (tipo: string) => {
    setTipoSeleccionado(tipo);
    setModalVisible(false);
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
            placeholder="Nombre del emprendimiento"
            placeholderTextColor="#aaa"
            cursorColor="#0C86FF"
          />

          <TouchableOpacity
            style={styles.input}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: tipoSeleccionado ? "#fff" : "#888" }}>
              {tipoSeleccionado || "Selecciona el tipo de emprendimiento"}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Descripción del emprendimiento"
            placeholderTextColor="#aaa"
            multiline
            cursorColor="#0C86FF"
          />

          <TextInput
            style={styles.input}
            placeholder="Dirección (opcional)"
            placeholderTextColor="#aaa"
            cursorColor="#0C86FF"
          />

          <TextInput
            style={styles.input}
            placeholder="Teléfono o contacto directo (opcional)"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
            cursorColor="#0C86FF"
          />

          <TextInput
            style={styles.input}
            placeholder="Página web o redes sociales (opcional)"
            placeholderTextColor="#aaa"
            cursorColor="#0C86FF"
          />

          <TouchableOpacity style={styles.button}>
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
