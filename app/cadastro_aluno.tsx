import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createAluno } from "../services/firestore/alunos";
import { scheduleLocalNotification } from "../services/notifications";

export default function CadastroAlunoScreen() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateAluno() {
    if (!nome.trim()) {
      await scheduleLocalNotification({
        title: "Erro ao cadastrar",
        body: "Informe o nome do aluno.",
      });
      return;
    }

    try {
      setLoading(true);
      await createAluno({ nome: nome.trim() });
      setNome("");

      await scheduleLocalNotification({
        title: "Aluno criado",
        body: "Cadastro realizado com sucesso.",
      });

      router.back();
    } catch (error: any) {
      await scheduleLocalNotification({
        title: "Erro ao cadastrar",
        body: error?.message || "Não foi possível criar o aluno.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.card}>
        <Text style={styles.title}>Cadastro de Aluno</Text>
        <Text style={styles.subtitle}>Preencha o nome e salve o aluno</Text>

        <TextInput
          placeholder="Nome do aluno"
          placeholderTextColor="#7b8aa0"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleCreateAluno}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Criando..." : "Criar aluno"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
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
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#c7d6ee",
    backgroundColor: "#f8fbff",
    borderRadius: 8,
    padding: 12,
  },
  button: {
    backgroundColor: "#2b5fab",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
