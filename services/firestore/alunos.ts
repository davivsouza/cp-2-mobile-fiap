import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export type Aluno = {
  id: string;
  nome: string;
};

type CreateAlunoInput = {
  nome: string;
};

const alunosCollection = collection(db, "alunos");

export async function createAluno(input: CreateAlunoInput) {
  const ref = await addDoc(alunosCollection, input);

  return ref.id;
}

export async function listAlunos() {
  const snapshot = await getDocs(alunosCollection);

  return snapshot.docs
    .map((item) => ({
      id: item.id,
      ...(item.data() as Omit<Aluno, "id">),
    }))
    .filter((aluno) => typeof aluno.nome === "string" && aluno.nome.trim().length > 0);
}

export async function deleteAluno(alunoId: string) {
  await deleteDoc(doc(db, "alunos", alunoId));
}
