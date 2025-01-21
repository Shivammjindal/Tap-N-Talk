import { useMemo } from "react"
import { usePathname, useRouter } from "next/navigation"
import { HiChat } from "react-icons/hi"
import { 
    HiArrowRightOnRectangle ,
    HiUser
} from "react-icons/hi2"

import { signOut } from "next-auth/react"
import useConversation from "./useConversation"
import toast from "react-hot-toast"

const useRoutes = () => {

    const pathname = usePathname();
    const router = useRouter()

    const { conversationId } = useConversation();
    const routes = useMemo(() => [
        {
            label:'Chat',
            href:'/conversations',
            icon: HiChat,
            active:pathname === '/conversations' || !!conversationId
        },
        {
            label:'Users',
            href:'/users',
            icon: HiUser,
            active: pathname === '/users'
        },
        {
            label:'Logout',
            href:'/',
            onClick:() => { 
                signOut(); 
                console.log("Signing Out");
                toast.success('Logged Out Successfully');
            },
            icon: HiArrowRightOnRectangle
        }
    ],[])

    return routes
}

export default useRoutes