import { getSessions } from "./GetSessions"
import axios from "axios"

const getCurrentUserClient = async (email:string) => {

    try {

        if(!email){
            return null;
        }

        const user = await axios.post('http://localhost:3000/api/users',{ email })
        if(!user){
            return null;
        }

        return user.data
    } catch (error:any) {
        return null
    }
}

export default getCurrentUserClient