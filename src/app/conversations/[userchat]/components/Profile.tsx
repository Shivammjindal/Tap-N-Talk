"use client"
import React from 'react'
import Image from 'next/image'
import { UserModelType } from '@/models/user.model'

interface AvatarProps{
    currentUser: UserModelType | undefined
}

const Avatar: React.FC<AvatarProps> = ({currentUser}) => {
    return (
        <div className='relative'>
            <div className='
                relative
                inline-block
                rounded-full
                overflow-hidden
                h-28
                w-28
                sm:h-14
                sm:w-14
                md:h-20
                md:w-20
                ring-[2px]
                ring-blue-600
            '>
                <Image
                    alt="Avatar"
                    src={currentUser?.image || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
                    fill
                />
            </div>
        </div>
    );
}

export default Avatar