"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const addPlayerSchema = z.object({
  timeId: z.string().nonempty("O ID do time não pode estar vazio"),
  nome: z.string().nonempty("O nome do jogador é obrigatório"),
  telefone: z
    .string()
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "O número de telefone deve estar no formato (99) 99999-9999"
    ),
  discord: z.string().optional(),
  turma: z.string().optional(),
});

type AddPlayer = z.infer<typeof addPlayerSchema>;

const addPlayer = async (data: AddPlayer) => {
  try {
    const time = await prisma.time.findUnique({
      where: {
        id: data.timeId,
      },
    });

    if (!time) {
      throw new Error("Time não encontrado");
    }

    const playerTeam = await prisma.jogador.create({
      data: {
        timeId: data.timeId,
        nome: data.nome,
        discord: data.discord,
        turma: data.turma,
        telefone: data.telefone,
      },
    });

    if (!playerTeam) {
      throw new Error("Erro ao adicionar jogador ao time");
    }

    return playerTeam;
  } catch (error) {
    throw new Error(`Erro ao adicionar jogador ao time: ${error}`);
  }
};

export { addPlayer };
