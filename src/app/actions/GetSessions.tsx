import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"

const getSessions = async () => {
    const session = await getServerSession(authOptions)
    return session
}

export { getSessions }