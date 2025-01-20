import React from 'react'
import Image from 'next/image'
import { UserModelType } from '@/models/user.model'
import useActiveList from '@/app/hooks/useActivelist'

interface AvatarProps{
    isGroup:boolean,
    currentUser: UserModelType | undefined
}

const Avatar: React.FC<AvatarProps> = ({isGroup,currentUser}) => {

    const { members } = useActiveList()
    const isActive = members.indexOf(currentUser?.email!) !== -1

    if(isGroup){
        return (
            <div className='relative'>
                <div className='
                    relative
                    inline-block
                    rounded-full
                    overflow-hidden
                    h-6
                    w-6
                    sm:h-7
                    sm:w-7
                    md:h-8
                    md:w-8
                    ring-1
                    ring-gray-500
                '>
                    <Image
                        alt="Avatar"
                        src={"https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-group-icon-png-image_1796653.jpg"}
                        fill
                    />
                </div>
                {isActive && (
                    <span
                        className='
                            absolute
                            block
                            rounded-full
                            bg-green-500
                            ring-2
                            ring-white
                            top-0
                            right-0
                            w-[7px]
                            h-[7px]
                            md:h-2
                            md:w-2
                        '
                    >
                    </span>
                )}
            </div>
        )
    }

    else{

    return (
        <div className='relative'>
            <div className='
                relative
                inline-block
                rounded-full
                overflow-hidden
                h-6
                w-6
                sm:h-7
                sm:w-7
                md:h-8
                md:w-8
                ring-1
                ring-gray-500
            '>
                <Image
                    alt="Avatar"
                    src={currentUser?.image || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
                    fill
                />
            </div>
            {
            isActive && <span
                className='
                    absolute
                    block
                    rounded-full
                    bg-green-500
                    ring-2
                    ring-white
                    top-0
                    right-0
                    w-[7px]
                    h-[7px]
                    md:h-2
                    md:w-2
                '
            >
            </span>
    }
        </div>
    
    );
}
}

export default Avatar