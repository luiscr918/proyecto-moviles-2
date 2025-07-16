import { StyleSheet } from "react-native";

export const perfilStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
  },
  scroll: {
    paddingBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0C86FF",
    marginBottom: 30,
    textAlign: "center",
  },
  fieldRow: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 6,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#111",
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 15,
  },
  value: {
    fontSize: 18,
    color: "#fff",
    flexShrink: 1,
  },
  editBtn: {
    paddingLeft: 15,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#0C86FF",
    paddingVertical: 16,
    borderRadius: 35,
    alignItems: "center",
    shadowColor: "#0C86FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#0C86FF",
  },

  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0C86FF",
    borderRadius: 20,
    padding: 5,
  },
});
