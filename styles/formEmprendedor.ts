import { StyleSheet } from "react-native";

export const formEmprendedor = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 60,
    justifyContent: "center",
    alignItems: "center",
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
});
