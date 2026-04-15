import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Aluno } from "../services/firestore/alunos";

type AlunoListItemProps = {
  aluno: Aluno;
  onPressAluno: (aluno: Aluno) => void;
  onDeleteAluno: (aluno: Aluno) => void;
};

export function AlunoListItem({
  aluno,
  onPressAluno,
  onDeleteAluno,
}: AlunoListItemProps) {
  return (
    <View style={styles.itemCard}>
      <Pressable style={styles.itemMainAction} onPress={() => onPressAluno(aluno)}>
        <Text style={styles.itemName}>{aluno.nome}</Text>
      </Pressable>
      <Pressable onPress={() => onDeleteAluno(aluno)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>X</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d7e3f8",
    borderRadius: 12,
    padding: 14,
  },
  itemMainAction: {
    flex: 1,
    paddingRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#24324a",
  },
  deleteButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffe1e1",
  },
  deleteButtonText: {
    color: "#a52b2b",
    fontWeight: "700",
  },
});
