import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "../supabase/Config";
import { registroEmprendimientoStyles } from "../styles/registroEmprendimiento";

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
      <LinearGradient
        colors={["#000000", "#071a40"]}
        style={registroEmprendimientoStyles.container}
      >
        <ScrollView
          contentContainerStyle={registroEmprendimientoStyles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={registroEmprendimientoStyles.title}>
            Registro de Emprendimiento
          </Text>
          <TextInput
            style={registroEmprendimientoStyles.input}
            placeholder="RUC del emprendimiento"
            placeholderTextColor="#aaa"
            cursorColor="#0C86FF"
            value={ruc}
            onChangeText={setRuc}
          />
          <TextInput
            style={registroEmprendimientoStyles.input}
            placeholder="Nombre del emprendimiento"
            placeholderTextColor="#aaa"
            cursorColor="#0C86FF"
            value={nombre}
            onChangeText={setNombre}
          />

          <TouchableOpacity
            style={registroEmprendimientoStyles.input}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: categoria ? "#fff" : "#888" }}>
              {categoria || "Selecciona la categoria de emprendimiento"}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={[registroEmprendimientoStyles.input, { height: 100 }]}
            placeholder="Descripción del emprendimiento"
            placeholderTextColor="#aaa"
            multiline
            cursorColor="#0C86FF"
            value={descripcion}
            onChangeText={setDescripcion}
          />

          <TextInput
            style={registroEmprendimientoStyles.input}
            placeholder="Dirección"
            placeholderTextColor="#aaa"
            cursorColor="#0C86FF"
            value={direccion}
            onChangeText={setDireccion}
          />

          <TouchableOpacity
            onPress={guardarEmprendimiento}
            style={registroEmprendimientoStyles.button}
          >
            <Text style={registroEmprendimientoStyles.buttonText}>
              Registrar Emprendimiento
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={registroEmprendimientoStyles.modalContainer}>
            <View style={registroEmprendimientoStyles.modalBox}>
              <Text style={registroEmprendimientoStyles.modalTitle}>
                Selecciona un tipo
              </Text>
              <FlatList
                data={tiposEmprendimiento}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={registroEmprendimientoStyles.modalItem}
                    onPress={() => seleccionarTipo(item)}
                  >
                    <Text style={registroEmprendimientoStyles.modalItemText}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={registroEmprendimientoStyles.modalCancelar}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
};
