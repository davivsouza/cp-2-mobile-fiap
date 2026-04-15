import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";

export type Checkpoint = {
  id: string;
  id_aluno: string;
  nota_cp1: number;
  nota_cp2: number;
  nota_cp3: number;
  media: number;
};

type CreateCheckpointInput = Omit<Checkpoint, "id">;

const checkpointsCollection = collection(db, "notas");

export async function createCheckpoint(input: CreateCheckpointInput) {
  const ref = await addDoc(checkpointsCollection, input);

  return ref.id;
}

export async function listCheckpoints() {
  const snapshot = await getDocs(checkpointsCollection);

  return snapshot.docs.map((item): Checkpoint => ({
    id: item.id,
    ...(item.data() as Omit<Checkpoint, "id">),
  }));
}

export async function getCheckpointByAlunoId(
  alunoId: string,
): Promise<Checkpoint | null> {
  const q = query(checkpointsCollection, where("id_aluno", "==", alunoId));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const first = snapshot.docs[0];
  return {
    id: first.id,
    ...(first.data() as Omit<Checkpoint, "id">),
  };
}

export async function deleteCheckpoint(checkpointId: string) {
  await deleteDoc(doc(db, "notas", checkpointId));
}
