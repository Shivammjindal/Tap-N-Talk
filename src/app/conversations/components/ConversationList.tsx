"use client"
import React, { useMemo } from 'react'
import clsx from 'clsx'
import useConversation from '@/app/hooks/useConversation'
import { useState,useEffect } from 'react'
import GroupChatModel from './GroupChat'
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from './ConversationBox'
import { FullConversationType, FullMessageType } from '@/types/model-types'
import { UserModelType } from '@/models/user.model'
import { pusherClient } from '@/app/libs/pusher'
import { useSession } from 'next-auth/react'
import { find } from 'lodash'
import { LoadingComponent } from './Loading'
import { useRouter } from 'next/navigation'
import { HiRefresh } from 'react-icons/hi'

interface ConversationListProps{
    initialItems:FullConversationType[],
    users:UserModelType[]
}

interface ConversationUpdateProps{
  id: string,
  messages : FullMessageType
}

interface removeProps{
  id: string
}

function ConversationList({initialItems,users}:ConversationListProps) {

  const [items, setItems] = useState<FullConversationType[]>(initialItems)
  const { conversationId, isOpen } = useConversation()
  const [ openModal, setOpenModel ] = useState(false);
  const [loading, setLoading] = useState(true);
  const session = useSession()
  const router = useRouter()

  const pusherKey = useMemo(() => {
    return session?.data?.user?.email
  },[session?.data?.user?.email])

  useEffect(() => {

    if(!pusherKey){
      return ;
    }

    setLoading(false);

    const handleConversationNew = (conversation:FullConversationType) => {

      setItems((current:FullConversationType[]) => {
        if(find(current, {_id: conversation._id})){
          return current;
        }

        return [...current, conversation]
      })
    }

    const conversationUpdate = (conversation: ConversationUpdateProps) => {
      console.log("Items : ",items)
      setItems((current) => current.map((currentConversation) => {
        if(currentConversation._id === conversation.id){
          currentConversation.message.push(conversation.messages);
          currentConversation.lastMessageAt = conversation.messages.createdAt
          return currentConversation
        }
        return currentConversation
      }).sort((a,b) => new Date(b.lastMessageAt!).getTime()-new Date(a.lastMessageAt!).getTime()))
    }

    const handleConversationRemove = (conversation : removeProps) => {
      setItems((current) => current.filter((convo) => convo._id !== conversation.id))
      router.push('/conversations')
    }

    pusherClient.subscribe(pusherKey)
    pusherClient.bind('conversation:new',handleConversationNew)
    pusherClient.bind('conversation:update',conversationUpdate)
    pusherClient.bind('conversation:remove',handleConversationRemove)

    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind('conversation:new',handleConversationNew)
      pusherClient.unbind('conversation:update',conversationUpdate)
      pusherClient.unbind('conversation:remove',handleConversationRemove)
    }
  },[session?.data?.user?.email, conversationId, router])

  return (
    <div>
    {!loading ? <div
      className={clsx(
        'lg:fixed overflow-y-scroll lg:left-[2.7rem] lg:top-0 pb-20',
          isOpen? "hidden lg:block" : "block w-full left-0"
      )}
    >
      <div className='px-5'>
        <div className='flex justify-center lg:justify-between pl-4 mb-4 pt-3'>
          <div className='flex flex-row justify-between w-56 items-center text-xl lg:text-[1.5rem] font-medium'>
            Messages
            <div className='flex text-sm p-1 bg-neutral-200 rounded-lg justify-center items-center font-light cursor-pointer' onClick={() => window.location.reload()}>
              <HiRefresh size={20}/>
            </div>
            <div className='text-gray-700 p-[.2rem] bg-gray-200 rounded-lg' onClick={() => {
              setOpenModel(!openModal)
            }}>
              <MdOutlineGroupAdd size={20} cursor={'pointer'}/>
              {openModal && users.length > 0 && <GroupChatModel active={openModal} setActive={setOpenModel} users={users}/>}
            </div>
          </div>
        </div>
        <div className='flex flex-col overflow-scroll'>
          {items.length && 
            items.map((item) => {
              return <ConversationBox
                key={`${item._id || ''}`}
                data={item}
                selected={conversationId === item._id}
              />
          })}
        </div>
      </div>
    </div> : <div className='flex w-full h-screen items-center justify-center'><LoadingComponent/></div>}
    </div>
  )
}

export default ConversationList