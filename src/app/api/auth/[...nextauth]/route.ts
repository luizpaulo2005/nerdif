import { authOptions } from "@/lib/auth-options"
import NextAuth from "next-auth"

// @ts-expect-error - type error
const handlers = NextAuth(authOptions)

export { handlers as GET, handlers as POST }