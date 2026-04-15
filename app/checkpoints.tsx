import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Checkpoint,
  createCheckpoint,
  getCheckpointByAlunoId,
} from "../services/firestore/checkpoints";
import { PrimaryButton } from "../components/PrimaryButton";

export default function CheckpointsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ alunoId?: string | string[] }>();
  const alunoId = Array.isArray(params.alunoId)
    ? params.alunoId[0]
    : params.alunoId;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [nota, setNota] = useState<Checkpoint | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [cp1, setCp1] = useState("");
  const [cp2, setCp2] = useState("");
  const [cp3, setCp3] = useState("");

  function getMedia(n1: number, n2: number, n3: number) {
    if (Number.isNaN(n1) || Number.isNaN(n2) || Number.isNaN(n3)) return 0;
    return (n1 + n2 + n3) / 3;
  }

  async function loadNota() {
    if (!alunoId) {
      setError("Aluno não informado.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await getCheckpointByAlunoId(alunoId);
      setNota(data);
      setShowForm(!data);
    } catch (err: any) {
      const message = String(err?.message || "");
      if (message.includes("Missing or insufficient permissions")) {
        setError("Sem permissão para acessar notas no Firestore.");
      } else {
        setError(message || "Não foi possível carregar as notas.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNota();
  }, [alunoId]);

  async function handleSave() {
    if (!alunoId) return;

    const n1 = Number(cp1);
    const n2 = Number(cp2);
    const n3 = Number(cp3);
    const media = getMedia(n1, n2, n3);

    if (Number.isNaN(n1) || Number.isNaN(n2) || Number.isNaN(n3)) {
      Alert.alert("Dados inválidos", "Preencha as 3 notas corretamente.");
      return;
    }

    try {
      const input = {
        id_aluno: alunoId,
        nota_cp1: n1,
        nota_cp2: n2,
        nota_cp3: n3,
        media,
      };

      const id = await createCheckpoint(input);
      setNota({ id, ...input });
      setShowForm(false);
      Alert.alert("Sucesso", "Notas salvas com sucesso.");
    } catch (err: any) {
      Alert.alert("Erro", err?.message || "Não foi possível salvar as notas.");
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.card}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>

        <Text style={styles.title}>Checkpoints</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {loading ? <Text style={styles.info}>Carregando notas...</Text> : null}

        {!loading && nota && !showForm ? (
          <View style={styles.notesBox}>
            <Text style={styles.info}>CP1: {nota.nota_cp1}</Text>
            <Text style={styles.info}>CP2: {nota.nota_cp2}</Text>
            <Text style={styles.info}>CP3: {nota.nota_cp3}</Text>
            <Text style={styles.mediaText}>Média: {nota.media.toFixed(2)}</Text>
          </View>
        ) : null}

        {!loading && !nota && !showForm ? (
          <PrimaryButton
            label="Cadastrar nota"
            onPress={() => setShowForm(true)}
          />
        ) : null}

        {!loading && showForm ? (
          <View style={styles.form}>
            <TextInput
              placeholder="Nota CP1"
              value={cp1}
              onChangeText={setCp1}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              placeholder="Nota CP2"
              value={cp2}
              onChangeText={setCp2}
              keyboardType="numeric"
              style={styles.input}
            />
            <TextInput
              placeholder="Nota CP3"
              value={cp3}
              onChangeText={setCp3}
              keyboardType="numeric"
              style={styles.input}
            />

            <Text style={styles.mediaText}>
              Média:{" "}
              {getMedia(Number(cp1), Number(cp2), Number(cp3)).toFixed(2)}
            </Text>

            <PrimaryButton label="Salvar" onPress={handleSave} />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#edf3ff",
    borderWidth: 1,
    borderColor: "#d7e3f8",
  },
  backButtonText: {
    color: "#2b5fab",
    fontSize: 14,
    fontWeight: "600",
  },
  info: {
    fontSize: 14,
    color: "#2b5fab",
  },
  errorText: {
    color: "#ad2f2f",
    marginTop: 4,
  },
  notesBox: {
    gap: 8,
    marginTop: 8,
  },
  form: {
    gap: 10,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#c7d6ee",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#f8fbff",
  },
  mediaText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2b5fab",
  },
});
