"use client"

import React from 'react'
import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { format } from "date-fns"
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import Avatar from '@/app/users/components/Avatar'
import useOtherUser from '@/app/hooks/useOtherUser'
import { FullConversationType } from '@/types/model-types'
import { HiPhoto } from 'react-icons/hi2'
import { MessageModelType } from '@/models/message.model'

interface ConversationPropsType{
    data:FullConversationType
    selected?:boolean
}

interface PusherProps{
    conversationId: string,
    updateMessage: MessageModelType
}

function ConversationBox({data,selected}:ConversationPropsType) {

    const router = useRouter();
    const otherUser = useOtherUser(data);
    const session = useSession();

    const handleClick = useCallback(async () => {
        router.push(`/conversations/${data._id}`)
    },[data.id, router])

    const lastMessage = useMemo(() => {
        console.log('Running For new meaagw')
        const messages = data.message || []
        console.log(messages[data.message.length-1])
        return messages[messages.length-1];
    },[data.message.length,data.message])

    const userEmail = useMemo(() =>{
        return session?.data?.user?.email
    },[session?.data?.user?.email])

    const hasSeen = useMemo(() => {

        if(!lastMessage){
            return false;
        }

        const seenArray = lastMessage.seen || []

        const { users } = data

        const ide = users.filter((user) => {
            if(user.email === userEmail){
                return user
            }
        })

        if(!userEmail)
            return false;

        return seenArray.filter((id) => id === ide[0]?._id).length !== 0

    },[userEmail,lastMessage])

    const ISent = useMemo(() => {

        const { users } = data

        const ide = users.filter((user) => {
            if(user.email === userEmail){
                return user
            }
        })

        if(ide[0]?.email === userEmail){
            return userEmail
        }
    },[session?.data?.user?.email])

    const lastMessageText = useMemo(() => {
        if(lastMessage?.body ){
            console.log('Body -> ',lastMessage?.body)
            return lastMessage.body
        }
        if(lastMessage?.image){
            return 'Image'
        }

        return 'New Conversation'
    },[lastMessage])

  return (
    <div
        onClick={handleClick}
        className={clsx(`
                w-full
                lg:w-64
                relative
                flex
                items-center
                space-x-3
                rounded-lg
                transition
                cursor-pointer
                p-3
            `,
            selected?`bg-neutral-100` : `bg-white`,
        )}
    >
        <Avatar isGroup={data.isGroup} currentUser={otherUser}/>
        <div
            className='min-w-0 flex-1'
        >
            <div className='flex justify-between items-center mb-1'>
                {data.name || otherUser.name}
            </div>
            <div className='flex justify-between items-center'>
                <div className={clsx(`
                        text-sm
                        antialiased
                        h-5
                        overflow-hidden
                        m-0`,
                        hasSeen ? `font-normal` : `font-bold`)}
                >
                    <div className='flex relative items-center gap-1'>
                        {lastMessage?.image && <div><HiPhoto size={18}/></div>}
                        {lastMessageText}
                        {/* {ISent && <div className='absolute top-[1px] right-0 bg-neutral-100'><HiMiniCheck size={16}/></div>} */}
                    </div>
                </div>
                <div className='text-xs font-medium text-neutral-500'>
                    {lastMessage?.createdAt && (
                        <p>{format(new Date(lastMessage.createdAt), 'p')}</p>
                    )}
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default ConversationBox