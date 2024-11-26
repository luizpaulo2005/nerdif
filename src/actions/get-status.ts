"use server";

import { prisma } from "@/lib/prisma";

const getStatus = async () => {
  try {
    const select = await prisma.nerdIF.findMany();

    if (!select) {
      throw new Error("Status não encontrado");
    }

    return select;
  } catch (error) {
    throw new Error(`Erro ao buscar status: ${error}`);
  }
};

export { getStatus };
