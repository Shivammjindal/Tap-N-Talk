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

    const { data } = await axios.post('http://localhost:3000/api/getconversationbyid',{conversationId}) 

    return data
}

export { getConversationbyId }