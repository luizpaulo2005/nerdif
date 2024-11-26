import { Jogo } from "@/types/jogo";
import { Jogador } from "@/types/jogador";

interface Time {
  id: string;
  nome: string;
  jogoId: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  jogo: Jogo;
  jogadores: Jogador[];
}

export type { Time };
