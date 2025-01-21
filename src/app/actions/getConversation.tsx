import getCurrentUser from "./getCurrentUser"
import axios from "axios"
import { FullConversationType } from "@/types/model-types"

interface getConversationConversationProps{
    data:FullConversationType[]
}

const getConversation = async () => {

    const { user } = await getCurrentUser() || { user:null }

    if(!user){
        return []
    }
    
    const { data }:getConversationConversationProps = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getconversations`,{userId:user._id})

    return data
}

export { getConversation }