"use server"

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const getUser = async () => {
    const session = await getServerSession(authOptions)

    if (!session) {
        return null
    }

    const { user: sessionUser } = session

    const user = await prisma.user.findUnique({
        where: {
            // @ts-expect-error - TS doesn't know that sessionUser is defined
            email: sessionUser.email
        }
    })

    if (!user) {
        return null
    }

    return user
}

export { getUser }