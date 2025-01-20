import { useParams } from "next/navigation"; 
import { useMemo } from "react";

const useConversation = () => {

    const params = useParams();

    const conversationId = useMemo(() => {
        if(!params?.userchat){
            return '';
        }
        
        return params?.userchat as string
    },[params?.userchat])

    const isOpen = useMemo(() => !!conversationId,[conversationId])
    // const isOpen = true
    // !! this turens conversationId in boolen and weather it is present or not.

    return useMemo(() => {
        return {
            isOpen,
            conversationId
        }
    },[isOpen, conversationId])
}

export default useConversation