import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { perfilStyle } from "../styles/perfilStyle";
import { supabase } from "../supabase/Config";
import { ModalEditarPerfil } from "../components/ModalEditarPerfil";
import { CommonActions, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

interface Emprendedor {
  uid: string;
  cedula: string;
  nombre_completo: string;
  correo: string;
  telefono: string;
  foto: string;
}

export const PerfilScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [emprendedor, setEmprendedor] = useState<Emprendedor>();
  // Estado para controlar si hay una imagen pendiente de guardar
  const [imageToSave, setImageToSave] = useState<string | null>(null);

  // Función para traer usuario logeado
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
      if (data) {
        setEmprendedor(data);
        setImage(data.foto); // Establece la imagen actual del perfil
      } else if (error) {
        console.error("Error al cargar datos del emprendedor:", error.message);
      }
    }
  };

  // traerá el usuario logeado cada que se monte el screen
  useEffect(() => {
    traerLogeado();
  }, []);

  const onEditar = async (campo: string, valor: string) => {
    const { error } = await supabase
      .from("emprendedor")
      .update({ [campo]: valor })
      .eq("uid", emprendedor?.uid);
    if (!error) {
      Alert.alert("Éxito", "Se actualizó correctamente");
      // Refrescar los datos después de una edición
      traerLogeado();
    } else {
      Alert.alert("Error", error.message);
    }
  };

  // modal
  const [visible, setVisible] = useState(false);
  const [campo, setCampo] = useState("");

  const abrirModal = (valor: string) => {
    setVisible(true);
    setCampo(valor);
  };

  // cerrar sesion
  const navigation = useNavigation();
  const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      Alert.alert("Hasta pronto", "Cerraste sesión correctamente");
      navigation.dispatch(CommonActions.navigate({ name: "Login" }));
    } else {
      Alert.alert("Error al cerrar sesión", error.message);
    }
  };

  // Función para seleccionar la imagen
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // Usar el enum de Expo
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Muestra la imagen seleccionada en la UI
      setImageToSave(result.assets[0].uri); // Marca esta imagen como pendiente de guardar
    }
  };

  // Función para guardar la imagen en Supabase
  const saveImageToSupabase = async () => {
    if (!imageToSave || !emprendedor) {
      Alert.alert(
        "Error",
        "No hay imagen seleccionada o usuario no encontrado."
      );
      return;
    }

    try {
      // Determinar la extensión del archivo para el contentType y el filePath
      const fileExtension = imageToSave.split(".").pop() || "png"; // Fallback a 'png'
      const contentType = `image/${fileExtension}`;

      // Crear el path único para el usuario en Supabase Storage
      const filePath = `public/${emprendedor.uid}.${fileExtension}`;
      console.log("Subiendo imagen a:", filePath);

      // Subir la imagen usando el objeto { uri: ... } como en tu ejemplo
      const { error: uploadError } = await supabase.storage
        .from("imagenes")
        .upload(
          filePath,
          {
            uri: imageToSave, // ¡Aquí está el truco que te funcionó!
          } as any, // TypeScript no lo reconoce directamente, por eso 'as any'
          {
            contentType: contentType, // Usamos el tipo de contenido dinámico
            upsert: true, // Reemplaza si ya existe una imagen con el mismo nombre
          }
        );

      if (uploadError) {
        console.error("Error completo al subir la imagen:", uploadError); // Log detallado
        Alert.alert("Error al subir la imagen", uploadError.message);
        return;
      }
      Alert.alert("Éxito", "Imagen subida al almacenamiento con éxito.");

      // Obtener URL pública
      const { data } = supabase.storage.from("imagenes").getPublicUrl(filePath);
      const publicUrl = data.publicUrl;
      console.log("URL pública de la imagen:", publicUrl);

      // Guardar URL en la tabla `emprendedor`
      const { error: updateError } = await supabase
        .from("emprendedor")
        .update({ foto: publicUrl })
        .eq("uid", emprendedor.uid);

      if (updateError) {
        Alert.alert("Error al guardar la URL", updateError.message);
      } else {
        Alert.alert("Foto actualizada con éxito");
        setImageToSave(null); // Borra la imagen pendiente de guardar
        traerLogeado(); // Refresca los datos del perfil
      }
    } catch (e: any) {
      console.error("Error completo al guardar la imagen:", e);
      Alert.alert("Error", `Algo salió mal al guardar: ${e.message}`);
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
          {/* foto */}
          <View style={perfilStyle.avatarContainer}>
            <TouchableOpacity onPress={pickImage}>
              <View>
                <Image
                  source={{
                    uri:
                      image ||
                      emprendedor?.foto ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                  }}
                  style={perfilStyle.avatar}
                />
                <View style={perfilStyle.cameraIcon}>
                  <Feather name="camera" size={20} color="#fff" />
                </View>
              </View>
            </TouchableOpacity>
            {/* Botón de guardar foto, solo visible si hay una imagen nueva */}
            {imageToSave && (
              <TouchableOpacity
                onPress={saveImageToSupabase}
                style={[perfilStyle.button, { marginTop: 10, width: 150 }]}
              >
                <Text style={perfilStyle.buttonText}>Guardar Foto</Text>
              </TouchableOpacity>
            )}
          </View>
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
            <Text style={perfilStyle.label}>Cédula</Text>
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