'use client'
import useOtherUser from '@/app/hooks/useOtherUser'
import { useMemo, useState } from 'react'
import { FullConversationType } from '@/types/model-types'
import React from 'react'
import Link from 'next/link'
import { HiChevronLeft } from 'react-icons/hi'
import Avatar from '@/app/users/components/Avatar'
import { HiEllipsisHorizontal, HiEllipsisVertical } from 'react-icons/hi2'
import { ProfileDrawer } from './ProfileDrawer'
import { pusherClient } from '@/app/libs/pusher'
import { useEffect } from 'react'
import useActiveList from '@/app/hooks/useActivelist'

interface HeaderProps{
    conversation:FullConversationType
}

function Header({
    conversation
}:HeaderProps) {

    const otherUser = useOtherUser(conversation);
    const [drawerOpen , setDrawerOpen] = useState(false)
    const { members } = useActiveList();
    const isActive = members.indexOf(otherUser?.email!) !== -1

    useEffect(() => {

        const statusHandler = () => {
            console.log("Status Data ")
        }

        const conversationId:any = conversation?._id

        pusherClient.subscribe(conversationId)
        pusherClient.bind('user:active',statusHandler)

        return () => {
            pusherClient.unsubscribe(`${conversation._id}`)
            pusherClient.unbind('user:active',statusHandler)
        }
    },[conversation?._id])

    const statusText = useMemo(() => {
        if(conversation.isGroup){
            return `${conversation.users.length} members`
        }

        return isActive ? 'Online' : 'Offline'
    },[conversation, isActive])



  return (
    <div>
        <ProfileDrawer
            isOpen={drawerOpen}
            data={conversation}
            onClose={() => setDrawerOpen(false)}
        />
        
        <div
            className='
            bg-white
            w-full
            border-b-[1px]
            sm:px-4
            py-3
            lg:px-2
            shadow=sm'
        >
            <div className='flex w-full justify-between items-center'>
                
                <div className='flex gap-3 items-center'>
                    <div>
                        <Link 
                            href={'/conversations'}
                            className='lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'
                        >
                            <HiChevronLeft size={32}/>
                        </Link>
                    </div>
                    <Avatar isGroup={conversation.isGroup} currentUser={otherUser}/>

                    <div className='flex flex-col gap-0 items-start justify-center'>
                        <div className='text-md font-medium antialiased'>
                            {conversation.name || otherUser.name}
                        </div>
                        <div className='text-sm text-neutral-500 antialiased items-start justify-start'>
                            {statusText}
                        </div>
                    </div>
                </div>  
                <HiEllipsisHorizontal
                    size={32}
                    onClick={() => setDrawerOpen(!drawerOpen)}
                    className='
                        text-sky-500 hidden lg:block cursor-pointer hover:text-sky-600 transition duration-500 mr-4
                    '
                />
                <HiEllipsisVertical
                    size={32}
                    onClick={() => setDrawerOpen(!drawerOpen)}
                    className='
                        text-sky-500 block lg:hidden cursor-pointer hover:text-sky-600 transition duration-500 mr-3
                    '
                />
            </div>
        </div>
        
    </div>
    
  )
}

export default Header