"use client"
import React from 'react'
import DesktopItem from './DesktopItem'
import useRoutes from '@/app/hooks/useRoute'
import MobileItem from './MobileItem'
import useConversation from '@/app/hooks/useConversation'
import Avatar from '../Avatar'
import { useState } from 'react'
import ProfileSetUp from './ProfileSetup'
import { UserModelType } from '@/models/user.model'

interface MobileFooterProps{
  currentUser:UserModelType
}

const MobileFooter = ({ currentUser }: MobileFooterProps) => {

    const routes = useRoutes()
    const { isOpen } = useConversation()
    const [openProfile, setOpenProfile] = useState<boolean>(false)

    if(isOpen){
        return null
    }

  return (
    <div
        className='
            lg:hidden
            fixed
            bottom-0
            w-full
            border-t-[1px]
            flex
            justify-center
            items-center
            space-y-2
            z-20
            bg-white
        '
    >
       <nav className='my-2 flex flex-row items-center'>
        <ul
          role='list'
          className='
            flex
            flex-row
            gap-10
            justify-between
            items-center
          '
        >
          {
            routes.map((item) => (
                <MobileItem
                    key={item?.label}
                    label={item?.label}
                    href={item?.href}
                    active={item?.active}
                    icon={item?.icon}
                    onClick={item?.onClick}
                />
            ))
          }

          <div onClick={() => setOpenProfile(true)}>
            <Avatar isGroup={false} currentUser={currentUser}/>
            {openProfile && <ProfileSetUp user={currentUser} setModelOpen={setOpenProfile}/>}
          </div>
        </ul>
      </nav>
    </div>
  )
}

export default MobileFooter