"use server";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { z } from "zod";

const createTeamSchema = z.object({
  nome: z.string().nonempty("O nome do time não pode estar vazio"),
  jogoId: z.string().nonempty("O ID do jogo não pode estar vazio"),
  discord: z.string().optional(),
  turma: z.string().optional(),
  telefone: z
    .string()
    .regex(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      "O número de telefone deve estar no formato (99) 99999-9999"
    ),
});

type CreateTeamInput = z.infer<typeof createTeamSchema>;

const createTeam = async (data: CreateTeamInput) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error("Você precisa estar autenticado para criar um time");
    }

    const user = await prisma.user.findUnique({
      where: {
        // @ts-expect-error - type error
        email: session.user.email,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const { jogoId, telefone, nome, discord, turma } = createTeamSchema.parse(data);

    const createTeam = await prisma.time.create({
      data: {
        nome,
        jogoId,
        ownerId: user.id,
      },
    });

    if (!createTeam) {
      throw new Error("Erro ao criar time");
    }

    const createTeamOwner = await prisma.jogador.create({
      data: {
        nome: user.name,
        timeId: createTeam.id,
        role: "owner",
        discord,
        turma,
        telefone,
      },
    });

    if (!createTeamOwner) {
      throw new Error("Erro ao criar dono do time");
    }

    return createTeam;
  } catch (error) {
    throw new Error(`Erro ao criar time: ${error}`);
  }
};

export { createTeam };
