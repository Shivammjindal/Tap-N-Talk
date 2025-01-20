import { getSessions } from "./GetSessions";
import axios from "axios";

export const getAllUsers = async () => {

    const session = await getSessions()
    if(!session?.user?.email)
        return null

    const email = session?.user?.email
    const users = await axios.post('http://localhost:3000/api/allusers',{email})
    if(!users) return null
    
    return users.data
}