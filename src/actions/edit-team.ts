"use server";

import { prisma } from "@/lib/prisma";
import { Time } from "@/types/time";

interface EditTeam {
  nome?: string;
}

const editTeam = async ({ id }: Time, { nome }: EditTeam) => {
  try {
    const time = await prisma.time.findUnique({
      where: { id },
    });

    if (!time) {
      throw new Error("Time não encontrado");
    }

    const update = await prisma.time.update({
      where: { id },
      data: {
        nome,
      },
    });

    if (!update) {
      throw new Error("Erro ao editar time");
    }

    return update;
  } catch (error) {
    throw new Error(`Erro ao editar time: ${error}`);
  }
};

export { editTeam };
