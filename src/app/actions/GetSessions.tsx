import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"

const getSessions = async () => {
    return await getServerSession(authOptions)
}

export { getSessions }