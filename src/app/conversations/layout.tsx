import Sidebar from "../users/components/sidebar/Sidebar"
import ConversationList from "./components/ConversationList"
import { getConversation } from "../actions/getConversation"
import { getAllUsers } from "../actions/getUsers"
import { UserModelType } from "@/models/user.model"
import getCurrentUser from "../actions/getCurrentUser"
import { FullConversationType } from "@/types/model-types"

interface LayoutProps{
    children:React.ReactNode
}

const ConversationLayout:React.FC<LayoutProps> = async ({children}) => {

    const conversations:FullConversationType[] = await getConversation()
    console.log("Conversations : ",conversations)
    const { user } = await getCurrentUser() || { user : null }
    const { users } : { users: UserModelType[] } = await getAllUsers() || { users: [] }

    return(
        <Sidebar>
            <div className="h-full w-screen lg:w-full">
                <ConversationList initialItems={conversations} users={users}/>
                {children}
                <div className="fixed left-96 top-96">
                </div>
            </div>
        </Sidebar>
    )
}

export default ConversationLayout