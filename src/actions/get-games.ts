"use server"

import { prisma } from "@/lib/prisma"

const getGames = async () => {
    try {
        const jogos = await prisma.jogo.findMany()

        if (!jogos) {
            throw new Error("Nenhum jogo encontrado")
        }

        return jogos
    } catch (error) {
        throw new Error(`Erro ao buscar jogos: ${error}`)
    }
}

export { getGames }