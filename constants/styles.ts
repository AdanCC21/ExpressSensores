import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f7",
  },
  scroll: {
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: "#333",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    color: "#555",
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  statusBadge: {
    marginTop: 10,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    color: "white",
    fontWeight: "600",
  },
  statusOk: {
    backgroundColor: "#4caf50",
  },
  statusFail: {
    backgroundColor: "#f44336",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  buttonActive: {
    backgroundColor: "#1a1a1a",
  },
  buttonInactive: {
    backgroundColor: "#8a8a8a",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  shutter: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    padding: 15,
    backgroundColor: "#000",
    borderRadius: 50,
    opacity: 0.8,
  },
    previewImage: { width: 200, height: 300, borderRadius: 12, marginTop: 10 },

});
