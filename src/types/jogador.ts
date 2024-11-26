import { Time } from "@/types/time";

interface Jogador {
  id: string;
  nome: string;
  turma: string | null;
  discord: string | null;
  telefone: string;
  role: string;
  timeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { Jogador };
