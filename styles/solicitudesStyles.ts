import { StyleSheet } from "react-native";

export const solicitudesStyles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0C86FF",
    textAlign: "center",
    marginVertical: 20,
  },
  solicitudItem: {
    backgroundColor: "#111",
    borderRadius: 15,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  solicitudHeader: {
    alignItems:'center',
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cliente: {
    color: "#0C86FF",
    fontWeight: "700",
    fontSize: 16,
  },
  fecha: {
    color: "#666",
    fontSize: 13,
  },
  pedido: {
    color: "#eee",
    fontSize: 15,
    marginBottom: 12,
  },
  botonesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginHorizontal: 5,
  },
  acceptBtn: {
    backgroundColor: "#34d399", // verde
  },
  rejectBtn: {
    backgroundColor: "#ef4444", // rojo
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
