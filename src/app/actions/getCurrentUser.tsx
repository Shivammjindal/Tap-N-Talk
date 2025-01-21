import { getServerSession } from "next-auth"
import axios from "axios"
import { authOptions } from "../api/auth/[...nextauth]/options";

const getCurrentUser = async () => {

    try {

        const session = await getServerSession(authOptions);
        console.log("Session Obtained ", session?.user?.email)
        if(!session?.user?.email){
            return null
        }
        
        const email = session?.user?.email
        const user = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/users`,{ email })
        if(!user){
            return null;
        }

        return user.data
    } catch (error:any) {
        return null
    }
}

export default getCurrentUser