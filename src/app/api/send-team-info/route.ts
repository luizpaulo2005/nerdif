import { nodemailer } from "@/lib/nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const sendTeamInfo = async (req: NextRequest) => {
  if (req.headers.get("token") !== env.NEXT_PUBLIC_IDENTIFICATION_TOKEN) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    console.log("Iniciando envio de e-mails...");
    const jogo = await prisma.jogo.findMany();
    console.log("Jogos encontrados:", jogo.length);

    const emailPromises = jogo.map(async (jogo) => {
      const times = await prisma.time.findMany({
        where: { jogoId: jogo.id },
        include: { jogadores: true, owner: true },
      });
      console.log(`Times para o jogo ${jogo.nome}:`, times.length);

      const html = `
        <ul>
          ${times
            .map(
              (time, index) => `
              <div style="margin-bottom: 20px">
                  <b>${index + 1} - ${time.nome}</b>
                  <p>E-mail do responsável do time: ${time.owner.email}</p>
                  ${time.jogadores
                    .map(
                      (jogador, index) => `
                  <p>Jogador ${index + 1}</p>
                      <ul>
                          <li>Nome: ${jogador.nome}</li>
                          <li>Turma: ${jogador.turma || "Não informado"}</li>
                          <li>Discord: ${jogador.discord || "Não informado"}</li>
                      </ul>
                  `
                    )
                    .join("")}
              </div>
              `
            )
            .join("")}
        </ul>
      `;

      await nodemailer.sendMail({
        from: `"Luiz Paulo" <${env.NEXT_PUBLIC_MAIL_USER}>`,
        to: jogo.emailResponsavel,
        cc: [
          "fabio.oliveira@ifms.edu.br",
          "luiz.santos15@estudante.ifms.edu.br",
        ],
        subject: `Times NerdIF - ${jogo.nome}`,
        html,
      });

      console.log(`E-mail enviado para o jogo ${jogo.nome}`);
    });

    // Aguarda o envio de todos os e-mails em paralelo
    await Promise.all(emailPromises);

    return NextResponse.json({ message: "Mail has been sent" }, { status: 200 });
  } catch (err) {
    console.error("Erro ao enviar e-mails:", err);
    return NextResponse.json(
      { message: "Error in sending mail" },
      { status: 500 }
    );
  }
};

export { sendTeamInfo as GET };
