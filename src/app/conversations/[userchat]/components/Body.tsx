"use client"
import React, { useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox'
import { pusherClient } from '@/app/libs/pusher'
import { FullMessageType } from '@/types/model-types'
import useConversation from '@/app/hooks/useConversation'
import axios from 'axios'
import { find } from 'lodash'

interface BodyProps{
  initialMessages : FullMessageType[],
}

const Body: React.FC<BodyProps> = ({initialMessages}) => {

  const [message, setMessage] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { conversationId } = useConversation();
 
  useEffect(() => {
    //load new conversation on welcoming the new one
    axios.post(`http://localhost:3000/api/conversations/${conversationId}/seen`,conversationId)
  },[conversationId])

  useEffect(() => {
    //thats place where we subscribe to our pusher.
    pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView()

    const handleMessage = (message : FullMessageType) => {

      //alert everyone that we have seen the message.
      axios.post(`http://localhost:3000/api/conversations/${conversationId}/seen`,conversationId)

      setMessage((current) => {

        //Just checking that there is no duplicacy of messages
        if(find(current, {_id: message._id})){
          return current;
        }

        return [...current, message]
      })
      bottomRef?.current?.scrollIntoView()
    }

    const handleUpdateMessage = (newMessage:FullMessageType) => {

      //updating seen array
      setMessage((current) => current.map((currentMessage:FullMessageType) => {
        if(currentMessage._id === newMessage._id){
          return newMessage
        }
        return currentMessage
      }))

      // setMessage((current) => {
      //   console.log("Current Message ",current)
      //   // current.map((currentMessage) => {
      //   //   if(currentMessage._id === message._id){
      //   //     return message
      //   //   }

      //   //   return currentMessage
      //   // })
      //   return current
      // })
    }

    pusherClient.bind('new:message',handleMessage)
    pusherClient.bind('message:updated',handleUpdateMessage)

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('new:message',handleMessage)
      pusherClient.unbind('message:updated',handleUpdateMessage)
    }
  },[])

  return (
    <div className='flex-1 overflow-y-auto'>
      {/* use ref helps in percisting value throughout rerender */}
        <div>
          {
            message.map((msg,i) => (
              <MessageBox key={msg?._id || msg?.id || ''} isLast={i === message.length-1} data={msg}/>
            ))
          }
        </div>
    </div>
  )
}

export default Body