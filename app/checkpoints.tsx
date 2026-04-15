import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CheckpointsScreen() {
  const params = useLocalSearchParams<{ alunoId?: string | string[] }>();
  const alunoId = Array.isArray(params.alunoId) ? params.alunoId[0] : params.alunoId;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Checkpoints</Text>
        <Text style={styles.subtitle}>Cadastro de notas do aluno selecionado</Text>
        <Text style={styles.info}>Aluno ID: {alunoId || "não informado"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#eaf2ff",
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d7e3f8",
    borderRadius: 14,
    padding: 18,
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#24324a",
  },
  subtitle: {
    fontSize: 14,
    color: "#4d607e",
  },
  info: {
    marginTop: 8,
    fontSize: 13,
    color: "#2b5fab",
  },
});
