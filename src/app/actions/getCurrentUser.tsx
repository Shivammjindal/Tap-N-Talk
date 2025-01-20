import { getSessions } from "./GetSessions"
import axios from "axios"

const getCurrentUser = async () => {

    try {

        const session = await  getSessions()
        if(!session?.user?.email){
            return null
        }
        
        const email = session?.user?.email
        const user = await axios.post('http://localhost:3000/api/users',{ email })
        if(!user){
            return null;
        }

        return user.data
    } catch (error:any) {
        return null
    }
}

export default getCurrentUser