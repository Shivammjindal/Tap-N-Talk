import { getSessions } from "./GetSessions"
import axios from "axios"

const getCurrentUserClient = async (email:string) => {

    try {

        if(!email){
            return null;
        }

        const user = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`,{ email })
        if(!user){
            return null;
        }

        return user.data
    } catch (error:any) {
        return null
    }
}

export default getCurrentUserClient