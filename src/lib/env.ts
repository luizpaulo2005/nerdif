import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),
    NEXT_PUBLIC_AUTH_SECRET: z.string(),
    NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID: z.string(),
    NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET: z.string(),
    NEXT_PUBLIC_MAIL_SMTP: z.string(),
    NEXT_PUBLIC_MAIL_PORT: z.enum(["465", "587"]),
    NEXT_PUBLIC_MAIL_USER: z.string().email(),
    NEXT_PUBLIC_MAIL_PASSWORD: z.string(),
    NEXT_PUBLIC_IDENTIFICATION_TOKEN: z.string(),
})

const env = envSchema.parse(process.env);

export { env };