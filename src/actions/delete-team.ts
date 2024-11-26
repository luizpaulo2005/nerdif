"use server";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { Time } from "@/types/time";
import { getServerSession } from "next-auth";

const deleteTeam = async (timeId: Time["id"]) => {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      throw new Error("Você precisa estar autenticado para apagar um time");
    }

    const time = await prisma.time.findUnique({
        where: {
            id: timeId,
        },
    });

    if (!time) {
        throw new Error("Time não encontrado");
    }

    const user = await prisma.user.findUnique({
        where: {
            // @ts-expect-error - TS doesn't know that session.user is defined
            email: session.user?.email,
        },
    })

    if (!user) {
        throw new Error("Usuário não encontrado");
    }

    const jogador = await prisma.jogador.findFirst({
        where: {
            nome: user.name,
            timeId: time.id,
        }
    })

    if (!jogador) {
        throw new Error("Jogador não encontrado");
    }

    await prisma.jogador.delete({
        where: {
            id: jogador.id,
            timeId: timeId
        },
    })

    await prisma.time.delete({
        where: {
            id: timeId,
        },
    });

    return time;
  } catch (error) {
    throw new Error(`Erro ao apagar time: ${error}`);
  }
};

export { deleteTeam };
