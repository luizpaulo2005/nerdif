"use server";

import { prisma } from "@/lib/prisma";

const getTeams = async () => {
  try {
    const times = await prisma.time.findMany({
      include: {
        jogadores: {
          orderBy: {
            createdAt: "asc",
          },
        },
        jogo: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!times) {
      throw new Error("Nenhum time encontrado");
    }

    return times;
  } catch (error) {
    throw new Error(`Erro ao buscar times: ${error}`);
  }
};

export { getTeams };
