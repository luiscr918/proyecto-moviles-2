import { StyleSheet } from "react-native";

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  content: {
    flex: 1,
    alignItems: "center",
    // Si quieres que el contenido empiece desde arriba:
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0C86FF",
    marginBottom: 8,
  },
  intro: {
    fontSize: 17,
    color: "#eee",
    marginBottom: 25,
    textAlign: "center",
    lineHeight: 24,
  },
  imageWrapper: {
    width: "90%",
    height: 220,
    borderRadius: 20,
    shadowColor: "#0C86FF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
    marginBottom: 25,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  quote: {
    fontSize: 19,
    color: "#34d399",
    fontWeight: "700",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 18,
    paddingHorizontal: 20,
  },
  motivationalText: {
    fontSize: 18,
    color: "#34d399",
    fontWeight: "600",
    paddingHorizontal: 20,
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#0C86FF",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 35,
    shadowColor: "#0C86FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});