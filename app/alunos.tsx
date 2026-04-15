import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Aluno, deleteAluno, listAlunos } from "../services/firestore/alunos";
import { scheduleLocalNotification } from "../services/notifications";
import { PrimaryButton } from "../components/PrimaryButton";
import { AlunoListItem } from "../components/AlunoListItem";

export default function AlunosScreen() {
  const router = useRouter();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAlunos() {
    try {
      setLoading(true);
      setError("");
      const data = await listAlunos();
      setAlunos(data);
    } catch (err: any) {
      const message = err?.message
        ? `Não foi possível carregar os alunos: ${err.message}`
        : "Não foi possível carregar os alunos.";
      setError(message);
      console.error("Erro ao carregar alunos:", err);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadAlunos();
    }, []),
  );

  function handleDeleteAluno(aluno: Aluno) {
    Alert.alert("Excluir aluno", `Deseja excluir o aluno "${aluno.nome}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteAluno(aluno.id);
            setAlunos((prev) => prev.filter((item) => item.id !== aluno.id));
            await scheduleLocalNotification({
              title: "Aluno removido",
              body: `"${aluno.nome}" foi excluído com sucesso.`,
            });
          } catch (err: any) {
            await scheduleLocalNotification({
              title: "Erro ao excluir",
              body: err?.message || "Não foi possível excluir o aluno.",
            });
            Alert.alert(
              "Erro ao excluir",
              err?.message || "Não foi possível excluir o aluno.",
            );
          }
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Alunos</Text>
        <PrimaryButton
          label="Adicionar aluno"
          onPress={() => router.push("/cadastro_aluno")}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Aluno }) => {
          return (
            <AlunoListItem
              aluno={item}
              onPressAluno={(aluno) =>
                router.push({
                  pathname: "/checkpoints",
                  params: { alunoId: aluno.id },
                })
              }
              onDeleteAluno={handleDeleteAluno}
            />
          );
        }}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>
              {loading
                ? "Carregando alunos..."
                : "Nenhum aluno cadastrado ainda."}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#eaf2ff",
  },
  header: {
    marginTop: 4,
    marginBottom: 12,
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#24324a",
  },
  errorText: {
    color: "#ad2f2f",
    marginBottom: 10,
  },
  listContent: {
    gap: 10,
    paddingBottom: 20,
    flexGrow: 1,
  },
  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 14,
    color: "#4d607e",
  },
});
