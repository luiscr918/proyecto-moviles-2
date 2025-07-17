import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Emprendimiento } from "./EmprendimientosServiceScreen";
import { supabase } from "../supabase/Config";
import { LinearGradient } from "expo-linear-gradient";
import { EmprendimientosComponent } from "../components/EmprendimientosComponent";
import { VerServiciosComponent } from "../components/VerServiciosComponent";

export const AllServices = () => {
  const [emprendimientos, setEmprendimientos] = useState<Emprendimiento[]>([]);
  const [loading, setLoading] = useState(true);

  const traerLogeado = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("emprendimiento")
        .select("*")
        .eq("uid_emprendedor", user.id);

      if (error) {
        console.error("Error al traer emprendimientos:", error.message);
      } else {
        setEmprendimientos(data || []);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    traerLogeado();
  }, [emprendimientos]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#000", "#071a40"]} style={styles.container}>
        <Text style={styles.title}>
          Seleccione un emprendimiento para ver los servicios registrados
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0C86FF" />
        ) : emprendimientos.length === 0 ? (
          <Text style={styles.emptyText}>
            No tienes emprendimientos registrados aún.
          </Text>
        ) : (
          <FlatList
            data={emprendimientos}
            keyExtractor={(item) => item.ruc}
            renderItem={({ item }) => <VerServiciosComponent {...item} />}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0C86FF",
    marginBottom: 20,
    textAlign: "left",
  },
  emptyText: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});
