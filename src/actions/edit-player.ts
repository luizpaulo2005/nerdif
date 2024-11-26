"use server";

import { prisma } from "@/lib/prisma";
import { Jogador } from "@/types/jogador";

interface EditPlayer {
  id: Jogador["id"];
  nome?: Jogador["nome"];
  turma?: Jogador["turma"];
  discord?: Jogador["discord"];
  telefone?: Jogador["telefone"];
}

const editPlayer = async ({ id, nome, discord, turma, telefone }: EditPlayer) => {
    try {
        const jogador = await prisma.jogador.findUnique({
            where: { id },
        });

        if (!jogador) {
            throw new Error("Jogador não encontrado");
        }

        const update = await prisma.jogador.update({
            where: { id },
            data: {
                nome,
                discord,
                turma,
                telefone,
            },
        });

        if (!update) {
            throw new Error("Erro ao editar jogador");
        }

        return update;
    } catch (error) {
        throw new Error(`Erro ao editar jogador: ${error}`);
    }
};

export { editPlayer };
