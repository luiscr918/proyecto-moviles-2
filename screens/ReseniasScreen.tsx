import React from "react";
import { Text, View, FlatList, SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { reseniasStyle } from "../styles/reseniasStyle";
import { Reutilizables } from "../styles/reutilizables";

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
      <Text style={reseniasStyle.title}>Reseñas</Text>
      <View style={reseniasStyle.summary}>
        <Text style={reseniasStyle.promedioTexto}>
          Valoración promedio:{" "}
          <Text style={reseniasStyle.promedioNumero}>
            {promedio.toFixed(1)}
          </Text>{" "}
          / 5
        </Text>
        <Estrellas cantidad={Math.round(promedio)} />
        <Text style={reseniasStyle.totalResenas}>
          Total reseñas: {reseñas.length}
        </Text>
      </View>

      <FlatList
        data={reseñas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 60 }}
        renderItem={({ item }) => (
          <View style={reseniasStyle.reseñaItem}>
            <View style={reseniasStyle.reseñaHeader}>
              <Text style={reseniasStyle.usuario}>{item.usuario}</Text>
              <Estrellas cantidad={item.rating} />
            </View>
            <Text style={reseniasStyle.comentario}>{item.comentario}</Text>
            <Text style={reseniasStyle.fecha}>
              {new Date(item.fecha).toLocaleDateString()}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
