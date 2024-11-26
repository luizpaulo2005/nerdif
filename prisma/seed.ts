import { prisma } from "@/lib/prisma"
import GamesJson from '@/lib/games.json';
import { Jogo } from "@/types/jogo";

const games: Jogo[] = JSON.parse(JSON.stringify(GamesJson));

async function main(){
    for (const jogo of games) {
      await prisma.jogo.create({
        data: {
            nome: jogo.nome,
            maxJogadores: jogo.maxJogadores,
            logoUrl: jogo.logoUrl,
            emailResponsavel: jogo.emailResponsavel,
        }
    })

    console.log(`Jogo ${jogo.nome} criado com sucesso!`)
    }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })