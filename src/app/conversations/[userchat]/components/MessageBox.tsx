"use client"
import React from 'react'
import { FullMessageType } from '@/types/model-types'
import { useSession } from 'next-auth/react'
import { UserModelType } from '@/models/user.model'
import clsx from 'clsx'
import Avatar from '@/app/users/components/Avatar'
import { format } from 'date-fns/format'
import Image from 'next/image'


interface messageBoxProps{
    data?:FullMessageType,
    isLast?:boolean
}

const MessageBox: React.FC<messageBoxProps> = ({isLast,data}) => {

    const session = useSession();
    const userEmail = session?.data?.user?.email

    const isOwn = userEmail === data?.sender?.email
    let seenList = (data?.seen || [])
    .filter((user:UserModelType) => {
       if(user.email !== data?.sender?.email){
        return user
       }
    })
    .map((user) => user.name)

    seenList.sort()

    let finalSeen = []

    for(let i = 0; i < seenList.length; ++i){
        if(i+1 < seenList.length && seenList[i] !== seenList[i+1]){
            finalSeen.push(seenList[i]);
        }
        else if(i+1 === seenList.length){
            finalSeen.push(seenList[i]);
        }
    }

    finalSeen.join(', ')

    // .join(', ') //convert array into string with the given seperator like [1,2,3,4] => 1,2,3,4

    const container = clsx(
        'flex gap-3 p-4',
        isOwn && 'justify-end'
    )

    const avatar = clsx(isOwn && "order-2")

    const body = clsx(
        "flex flex-col gap-2",
        isOwn && "items-end"
    )

    const message = clsx(
        'text-sm w-fit overflow-hidden',
        isOwn ? 'bg-blue-500 text-white':'bg-gray-100',
        data?.image?'rounded-md p-0':'rounded-xl py-2 px-3'
    )
    const date = new Date(data?.createdAt || Date.now())

  return (
    <div>
        <div className={container}>
            <div className={avatar}>
                <Avatar isGroup={false} currentUser={data?.sender}/>
            </div>
            <div className={body}>
                <div className='flex items-center gap-1'>
                    <div className='text-xs md:text-[.81rem] text-gray-500'>
                        {data?.sender.name}
                    </div>
                    <div className='text-xs text-gray-400'>
                        {format(new Date(date),'p')}
                    </div>
                </div>
                <div className={message}>
                    {data?.image ? (
                        <Image
                            alt='Image'
                            height={288}
                            width={288}
                            src={data?.image}
                            className='object-cover cursor-pointer hover:scale-110 transition translate'
                        />
                    ) : <div className='min-h-4'>{data?.body}</div>}
                </div>
                {isLast && isOwn && seenList.length > 0 && 
                <div className='text-xs flex justify-end text-neutral-400'>
                    {`Seen by ${finalSeen}`}
                </div>}
            </div>
        </div>
    </div>
  )
}

export default MessageBox