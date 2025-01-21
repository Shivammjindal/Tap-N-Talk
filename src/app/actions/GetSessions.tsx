import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"

const getSessions = async () => {
    const session = await getServerSession(authOptions)
    console.log("Session Obtained",session)
    return session
}

export { getSessions }