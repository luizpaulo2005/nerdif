import { createTransport } from 'nodemailer';
import { env } from '@/lib/env';

const nodemailer = createTransport({
    host: env.NEXT_PUBLIC_MAIL_SMTP,
    port: parseInt(env.NEXT_PUBLIC_MAIL_PORT),
    secure: false,
    auth: {
        user: env.NEXT_PUBLIC_MAIL_USER,
        pass: env.NEXT_PUBLIC_MAIL_PASSWORD
    }
})

export { nodemailer }