"use client"
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Avatar from '../Avatar'
import { UserModelType } from '@/models/user.model'

interface UserBoxProps{
    data: UserModelType
}

const UserBox = ({data}:UserBoxProps) => {
    
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const handleClick = useCallback(() => {
        setLoading(true);
        //sending id at backend from which we do conversation. (Our Friend's Id)
        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/conversations`,{
            userId: data._id
        })
        .then((data) => {
            router.push(`/conversations/${data?.data?._id}`)
        })
        .finally(() => setLoading(false))
    },[data, router])
    
    return (
        <div
            onClick={handleClick}
            className='
                flex
                flex-row
                items-center
                justify-start
                lg:gap-3
                gap-4
                pl-4
                py-2
                lg:py-2
                lg:pl-1
                border-b-[1px]
                lg:h-auto
                lg:w-[16rem]
                w-full
                hover:bg-neutral-100
                overflow-y-scroll
            '
        >
            <div 
                className='
                    w-fit
                    relative
                    flex
                    flex-col
                    pt-2
                    lg:pt-3
                    lg:ml-1
                    lg:p-1
                    lg:justify-center
                    rounded-md
                    cursor-pointer
                '
            >
                <Avatar isGroup={false} currentUser={data}/>
            </div>
            <div className='flex flex-row items-center font-medium antialiased self-center'>
                {data.name}
            </div>
        </div>
    )
}

export default UserBox