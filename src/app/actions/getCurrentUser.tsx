import { useSession } from "next-auth/react"
import axios from "axios"

const getCurrentUser = async () => {

    try {

        const { data:session } = useSession()
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