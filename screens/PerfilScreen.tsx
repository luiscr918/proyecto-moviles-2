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
import * as Haptics from "expo-haptics";
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
  const [imageToSave, setImageToSave] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Traer usuario logeado
  const traerLogeado = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("emprendedor")
        .select("*")
        .eq("uid", user.id)
        .single();
      if (data) {
        setEmprendedor(data);

        // Añadimos timestamp para evitar cache
        if (data.foto) {
          setImage(`${data.foto}?t=${Date.now()}`);
        } else {
          setImage(null);
        }
      } else if (error) {
        console.error("Error al cargar datos del emprendedor:", error.message);
      }
    }
  };

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
      traerLogeado();
    } else {
      Alert.alert("Error", error.message);
    }
  };

  const [visible, setVisible] = useState(false);
  const [campo, setCampo] = useState("");

  const abrirModal = (valor: string) => {
    setVisible(true);
    setCampo(valor);
  };

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

  // Función para seleccionar imagen - igual que tu amiga
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setImageToSave(result.assets[0].uri);
      }
    } catch (e) {
      console.log("Error al seleccionar imagen", e);
    }
  };

  // Función para subir imagen adaptada igual que la de tu amiga
  const saveImageToSupabase = async () => {
    if (!imageToSave || !emprendedor) {
      Alert.alert(
        "Error",
        "No hay imagen seleccionada o usuario no encontrado."
      );
      return;
    }

    setUploading(true);

    try {
      const userId = emprendedor.uid;
      const fileName = `emprendedor_${userId}.jpg`;
      const filePath = `public/${fileName}`;

      // Fetch la imagen local y convertir a Uint8Array para subir
      const response = await fetch(imageToSave);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const arrayBuffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Verificar si ya existe archivo para update o upload
      const { data: existingFiles, error: listError } = await supabase.storage
        .from("imagenes")
        .list("public", {
          search: `emprendedor_${userId}`,
        });

      let uploadResult;
      if (!listError && existingFiles && existingFiles.length > 0) {
        uploadResult = await supabase.storage
          .from("imagenes")
          .update(filePath, uint8Array, {
            cacheControl: "3600",
            upsert: true,
            contentType: "image/jpeg",
          });
      } else {
        uploadResult = await supabase.storage
          .from("imagenes")
          .upload(filePath, uint8Array, {
            cacheControl: "3600",
            upsert: false,
            contentType: "image/jpeg",
          });
      }

      if (uploadResult.error) {
        Alert.alert("Error", "No se pudo subir la imagen");
        setUploading(false);
        return;
      }

      // Obtener URL pública
      const { data: urlData } = supabase.storage
        .from("imagenes")
        .getPublicUrl(filePath);
      const publicUrl = urlData.publicUrl;

      // Actualizar URL en la tabla emprendedor
      const { error: updateError } = await supabase
        .from("emprendedor")
        .update({ foto: publicUrl })
        .eq("uid", userId);

      if (updateError) {
        Alert.alert("Error", "No se pudo actualizar la foto en el perfil");
        setUploading(false);
        return;
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Éxito", "Foto de perfil actualizada correctamente");
      setImage(`${publicUrl}?t=${Date.now()}`); // Añadir timestamp para forzar recarga
      setImageToSave(null);
      traerLogeado();
    } catch (error: any) {
      Alert.alert("Error", `No se pudo subir la imagen: ${error.message}`);
      setUploading(false);
    } finally {
      setUploading(false);
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

          {/* Foto */}
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

            {imageToSave && (
              <TouchableOpacity
                onPress={saveImageToSupabase}
                style={[perfilStyle.button, { marginTop: 10, width: 150 }]}
                disabled={uploading}
              >
                <Text style={perfilStyle.buttonText}>
                  {uploading ? "Subiendo..." : "Guardar Foto"}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <ModalEditarPerfil
            visible={visible}
            onClose={setVisible}
            campo={campo}
            editar={onEditar}
          />

          {/* El resto de tu UI */}
          {/* ... campos de nombre, correo, teléfono, cédula ... */}
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
