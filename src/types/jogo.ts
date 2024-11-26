import { Time } from "@/types/time";

interface Jogo {
  id: string;
  nome: string;
  maxJogadores: number;
  logoUrl: string;
  emailResponsavel: string;
  createdAt: Date;
  updatedAt: Date;

  times?: Time[];
}

export type { Jogo };
