import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "@/types/model-types";

const useOtherUser = (conversation:FullConversationType) => {

    const session = useSession()
    const otherUser = useMemo(() => {
        const currentUserEmail = session?.data?.user?.email
        const otherUser = conversation.users.filter((user) => {
            if(user.email != currentUserEmail){
                return user;
            }
        })

        return otherUser
    },[session?.data?.user?.email, conversation.users])

    return otherUser[0]
}

export default useOtherUser