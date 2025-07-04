import { StyleSheet } from "react-native";

export const reseniasStyle = StyleSheet.create({
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
