"use client"
import React, { useState } from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Form from './components/Form'
import { useEffect } from 'react'
import { FullConversationType, FullMessageType } from '@/types/model-types'
import { LoadingComponent } from '../components/Loading'
import { useParams } from 'next/navigation'
import axios from 'axios'

export default function Conversation() {

  const { userchat }:any = useParams()
  const [messages, setMessages] = useState<null | FullMessageType[]>(null);
  const [conversation, setConversation] = useState<null | FullConversationType>(null)

  const GetRequirements = async () => {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getmessages`,{conversationId: userchat})
    const conversationData = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/getconversationbyid`,{ conversationId:userchat })

    setConversation(conversationData.data);
    setMessages(data.messages);
  }

  useEffect(() => {
    GetRequirements();
  },[userchat])

  if(!conversation || !messages){
    return (
      <div
        className='lg:pl-80 h-full'
      >
        <div className='h-full flex justify-center items-center'>
          <LoadingComponent/>
        </div>
      </div>
    )
  }
  
  return (
    <div className='lg:pl-80 h-full w-full'>
      <div className="h-full lg:border-l-[1px] lg:border-gray-200  flex flex-col">
        <Header conversation={conversation!}/>
        <Body initialMessages={messages!}/>
        <Form/>
      </div>
    </div>
  )
}