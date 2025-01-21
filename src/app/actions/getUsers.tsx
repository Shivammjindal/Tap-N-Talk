import { getSessions } from "./GetSessions";
import axios from "axios";

export const getAllUsers = async () => {

    const session = await getSessions()
    if(!session?.user?.email)
        return null

    const email = session?.user?.email
    const users = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/allusers`,{email})
    if(!users) return null
    
    return users.data
}