import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  textRegister: {
    fontSize: 15,
    color: "#56fbea",
    textAlign: "left",
    marginTop: 10,
  },
  inner: {
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    color: "#0C86FF",
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    marginVertical: 10,
    width: "100%",
  },
  imageCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    backgroundColor: "#1287FB",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#222",
    borderWidth: 1,
    borderColor: "#0C86FF",
  },
});
