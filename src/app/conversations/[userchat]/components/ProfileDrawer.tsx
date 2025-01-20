'use client'
import useOtherUser from "@/app/hooks/useOtherUser"
import { FullConversationType } from "@/types/model-types"
import { format } from "date-fns"
import { useMemo, useState } from "react"
import { Transition, TransitionChild } from "@headlessui/react"
import { MyModal } from "./DeleteModel"
import Avatar from "./Profile"
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md"
import useActiveList from "@/app/hooks/useActivelist"

interface ProfileDrawerProps{
    isOpen?:boolean,
    data:FullConversationType,
    onClose:() => void
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({isOpen,data,onClose}) => {

    //showing conversations Details
    //#1 Fetching other Users
    const OtherUsers = useOtherUser(data)
    const date = new Date(OtherUsers.createdAt || Date.now())
    const [modelOpen, setModelOpen] = useState(false)
    const { members } = useActiveList();
    const isActive = members.indexOf(OtherUsers?.email) !== -1

    //Showing Joining Date
    const joiningDate = useMemo(() => {
        return format(new Date(date),'PP')
    },[OtherUsers.createdAt])

    const title = useMemo(() => {
        return data.name || OtherUsers.name
    },[data.name, OtherUsers.name])

    const statusText = useMemo(() => {
        if(data.isGroup){
            return `${data.users.length} members`
        }

        return isActive ? 'Online' : 'Offline'
    },[data, isActive])

    console.log("Model Open ",modelOpen)

    return (
        <>
            <div className="fixed z-50">
                {modelOpen && <MyModal setModelOpen={setModelOpen}/>}
            </div>
            <div className="lg:absolute fixed left-0 w-screen z-20">
                <Transition show={isOpen}>
                <div className="flex flex-row z-50">
                    <div className="flex w-screen">
                        <TransitionChild
                            enter="transition ease-in-out duration-500 transform"
                            enterFrom="-translate-x-full opacity-0"
                            enterTo="opacity-0"
                            leave="transition ease-in-out duration-500 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div className="h-screen flex-1 overflow-x-scroll opacity-20 bg-neutral-800" onClick={onClose}>
                            </div>
                        </TransitionChild>
                        <TransitionChild
                            enter="transition ease-in-out duration-500 transform"
                            enterFrom="translate-x-full opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in-out duration-500 transform"
                            leaveFrom="opacity-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="flex lg:min-w-80 min-w-64 h-full z-50 px-4 justify-center bg-white">
                                <div className="absolute top-0 right-0 m-2 p-1 text-xl hover:border-[1px] hover:border-black hover:rounded-lg cursor-pointer" onClick={onClose}>
                                    <IoClose/>
                                </div>
                                <div className="flex flex-col items-center h-3/4 justify-center gap-3">
                                    <div className="mt-3">
                                        Profile
                                    </div>
                                    <div className="flex">
                                        <Avatar currentUser={OtherUsers}/>
                                    </div>
                                    <div className="text-lg font-medium antialiased">
                                        {title}
                                    </div>
                                    <div className="flex gap-1 text-sm font-medium text-neutral-600">
                                        <div>
                                            Joined On
                                        </div>
                                        <div>
                                            {joiningDate}
                                        </div>
                                    </div>
                                    <div className="flex gap-1 text-sm font-medium text-neutral-600">
                                        <div>
                                            Email : 
                                        </div>
                                        <div>
                                            {OtherUsers.email}
                                        </div>
                                    </div>
                                    <div className="flex gap-1 text-sm font-medium text-neutral-600">
                                        <div>
                                            Status : 
                                        </div>
                                        <div>
                                            {statusText}
                                        </div>
                                    </div>
                                    <div className="flex gap-1 px-3 py-1 items-center bg-neutral-100 rounded-lg text-sm font-medium text-neutral-600 cursor-pointer hover:bg-neutral-200" onClick={()=> {
                                        setModelOpen(true)
                                        onClose()
                                    }}>
                                        <div>Delete Chat</div>
                                        <MdDelete size={18}/>
                                    </div>
                                </div>
                                
                            </div>
                        </TransitionChild>
                    </div>
                </div>
            </Transition>
        </div>
        </>
        
    )
}