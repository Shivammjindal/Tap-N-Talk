import getCurrentUser from "./getCurrentUser"; 
import { UserModelType } from "@/models/user.model";
import axios from "axios";

interface userModel{
    user:UserModelType
}

const getConversationbyId = async ({ conversationId }: { conversationId:string }) => {

    const { user }:userModel = await getCurrentUser();
    if(!user?.email){
        return null
    }

    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/getconversationbyid`,{conversationId}) 

    return data
}

export { getConversationbyId }