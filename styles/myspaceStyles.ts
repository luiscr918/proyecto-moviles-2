import { StyleSheet } from "react-native";

export const myspaceStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0C86FF",
    marginBottom: 40,
  },
  infoBlock: {
    marginBottom: 30,
    alignItems: "center",
  },
  label: {
    fontSize: 20,
    color: "#aaa",
    marginBottom: 6,
  },
  value: {
    fontSize: 36,
    fontWeight: "700",
    color: "#0C86FF",
  },
  star: {
    color: "#FFD700",
  },
  button: {
    backgroundColor: "#0C86FF",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 35,
    marginTop: 30,
    shadowColor: "#0C86FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
