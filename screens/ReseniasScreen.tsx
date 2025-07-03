import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { Reutilizables } from "../styles/reutilizables";
import { Feather } from "@expo/vector-icons";

const reseñas = [
  {
    id: "1",
    usuario: "Ana Pérez",
    rating: 5,
    comentario: "Excelente servicio, muy recomendado!",
    fecha: "2025-06-25",
  },
  {
    id: "2",
    usuario: "Carlos Gómez",
    rating: 4,
    comentario: "Buen producto, llegó a tiempo.",
    fecha: "2025-06-23",
  },
  {
    id: "3",
    usuario: "Laura Martínez",
    rating: 3,
    comentario: "Me gustó, pero podría mejorar la atención.",
    fecha: "2025-06-20",
  },
];

const Estrellas = ({ cantidad }: { cantidad: number }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Feather
        key={i}
        name="star"
        size={16}
        color={i <= cantidad ? "#facc15" : "#555"}
        style={{ marginRight: 2 }}
      />
    );
  }
  return <View style={{ flexDirection: "row" }}>{stars}</View>;
};

export const ReseniasScreen = () => {
  const promedio =
    reseñas.reduce((acc, r) => acc + r.rating, 0) / reseñas.length;

  return (
    <SafeAreaView style={Reutilizables.container}>
      <Text style={styles.title}>Reseñas</Text>
      <View style={styles.summary}>
        <Text style={styles.promedioTexto}>
          Valoración promedio:{" "}
          <Text style={styles.promedioNumero}>{promedio.toFixed(1)}</Text> / 5
        </Text>
        <Estrellas cantidad={Math.round(promedio)} />
        <Text style={styles.totalResenas}>Total reseñas: {reseñas.length}</Text>
      </View>

      <FlatList
        data={reseñas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 60 }}
        renderItem={({ item }) => (
          <View style={styles.reseñaItem}>
            <View style={styles.reseñaHeader}>
              <Text style={styles.usuario}>{item.usuario}</Text>
              <Estrellas cantidad={item.rating} />
            </View>
            <Text style={styles.comentario}>{item.comentario}</Text>
            <Text style={styles.fecha}>
              {new Date(item.fecha).toLocaleDateString()}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0C86FF",
    textAlign: "center",
    marginVertical: 20,
  },
  summary: {
    alignItems: "center",
    marginBottom: 20,
  },
  promedioTexto: {
    fontSize: 18,
    color: "#eee",
  },
  promedioNumero: {
    fontWeight: "700",
    color: "#34d399",
  },
  totalResenas: {
    color: "#aaa",
    marginTop: 6,
  },
  reseñaItem: {
    backgroundColor: "#111",
    borderRadius: 15,
    padding: 16,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  reseñaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  usuario: {
    color: "#0C86FF",
    fontWeight: "700",
    fontSize: 16,
  },
  comentario: {
    color: "#eee",
    fontSize: 15,
    marginBottom: 8,
  },
  fecha: {
    color: "#666",
    fontSize: 13,
    textAlign: "right",
  },
});
