import Google from "next-auth/providers/google"
import { prisma } from "@/lib/prisma";
import { env } from "@/lib/env";
 
const authOptions = {
  secret: env.NEXT_PUBLIC_AUTH_SECRET,
  providers: [Google({
    clientId: env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID,
    clientSecret: env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET,
  })],
  callbacks: {
    // @ts-expect-error - type error
    async signIn({ account, profile }) {
      if (account.provider === "google" && profile.email_verified) {
        // Limitar e-mails ao domínio @ifms.edu.br ou @estudante.ifms.edu.br
        // const allowedDomains = ['ifms.edu.br', 'estudante.ifms.edu.br'];
        // const emailDomain = profile.email.split('@')[1];

        // if (!allowedDomains.includes(emailDomain)) {
        //   return false;  // Bloqueia o login se o e-mail não pertencer ao domínio permitido
        // }

        const select = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (!select) {
          await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name,
              imageUrl: profile.picture,
            },
          });
        }
      }

      return true;
    },

    async redirect() {
      return "/"
    }
  },
}

export { authOptions }