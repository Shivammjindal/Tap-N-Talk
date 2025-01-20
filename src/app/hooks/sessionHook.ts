'use client'
import { useSession } from "next-auth/react";

export const SessionHook = () => {
    const session = useSession()
    return session?.data
}