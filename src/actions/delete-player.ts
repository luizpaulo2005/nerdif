"use server";

import { prisma } from "@/lib/prisma";
import { Jogador } from "@/types/jogador";

const deletePlayer = async ({ id }: Jogador) => {
  try {
    const jogador = await prisma.jogador.delete({
      where: {
        id,
      },
    });

    if (!jogador) {
      throw new Error("Erro ao excluir jogador");
    }

    return jogador;
  } catch (error) {
    throw new Error(`Erro ao deletar jogador: ${error}`);
  }
};

export { deletePlayer };
