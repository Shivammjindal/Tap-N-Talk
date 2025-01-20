'use client'
import React from 'react'
import { useState } from 'react'
import useRoutes from '@/app/hooks/useRoute'
import DesktopItem from './DesktopItem'
import Avatar from '../Avatar'
import { UserModelType } from '@/models/user.model'
import ProfileSetUp from '@/app/users/components/sidebar/ProfileSetup'
import { CldUploadButton } from 'next-cloudinary'
import { useRouter } from 'next/navigation'

interface DesktopSidebarprops{
  currentUser:UserModelType
}

function DesktopSidebar({ currentUser }: DesktopSidebarprops) {
  
    const routes = useRoutes();
    const router = useRouter()
    const [openProfile, setOpenProfile] = useState<boolean>(false)

  return (
    <div className='
        hidden
        lg:fixed
        lg:inset-y-0
        lg:left-0
        lg:z-40
        lg:w-16
        xl:px-6
        lg:overflow-y-auto
        lg:bg-white
        lg:border-r-[1px]
        lg:pb-4
        lg:flex
        lg:flex-col
        items-center
        justify-between
      '
      >

      <nav className='mt-4 flex flex-col justify-between'>
        <ul
          role='list'
          className='
            flex
            flex-col
            items-center
            space-y-1
          '
        >
          {
            routes.map((item) => (
                <DesktopItem
                    key={item?.label}
                    label={item?.label}
                    href={item?.href}
                    active={item?.active}
                    icon={item?.icon}
                    onClick={item?.onClick}
                />
            ))
          }
        </ul>
      </nav>
      <nav
        className='
          mt-4
          flex
          flex-col
          justify-between
          item-center
        '
      >
        <div
          onClick={() => {setOpenProfile(true)}}
          className='
            cursor-pointer 
            hover:opacity-75 
            transition 
            duration-700'
        >
          <Avatar isGroup={false} currentUser={currentUser}/>
          {openProfile && <ProfileSetUp user={currentUser} setModelOpen={setOpenProfile}/>}
        </div>
      </nav>
    </div>
  )
}

export default DesktopSidebar