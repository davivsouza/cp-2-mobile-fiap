import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Aluno, deleteAluno, listAlunos } from "../services/firestore/alunos";

export function useAlunos() {
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

  async function removeAluno(alunoId: string) {
    await deleteAluno(alunoId);
    setAlunos((prev) => prev.filter((item) => item.id !== alunoId));
  }

  useFocusEffect(
    useCallback(() => {
      loadAlunos();
    }, []),
  );

  return { alunos, loading, error, loadAlunos, removeAluno };
}
