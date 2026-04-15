import { useEffect, useState } from "react";
import {
  Checkpoint,
  createCheckpoint,
  getCheckpointByAlunoId,
} from "../services/firestore/checkpoints";

export function useCheckpoint(alunoId?: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [nota, setNota] = useState<Checkpoint | null>(null);

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

  async function saveNota(cp1: number, cp2: number, cp3: number) {
    if (!alunoId) return null;

    const input = {
      id_aluno: alunoId,
      nota_cp1: cp1,
      nota_cp2: cp2,
      nota_cp3: cp3,
      media: getMedia(cp1, cp2, cp3),
    };

    const id = await createCheckpoint(input);
    const checkpoint = { id, ...input };
    setNota(checkpoint);
    return checkpoint;
  }

  useEffect(() => {
    loadNota();
  }, [alunoId]);

  return { nota, loading, error, loadNota, saveNota, getMedia };
}
