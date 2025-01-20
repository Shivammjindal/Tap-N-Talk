import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import getCurrentUser from '@/app/actions/getCurrentUser'
import MobileFooter from './MobileFooter'
import { UserModelType } from '@/models/user.model'

export default async function Sidebar({
  children
}:{
  children:React.ReactNode
}){

  const { user } : { user: UserModelType} = await getCurrentUser() || { user:[] }

  return (
    <div className='h-full'>
      <DesktopSidebar currentUser={ user } />
      <MobileFooter currentUser={user}/>
      {/* Making Side Taskmanager here */}
      <main className='h-full'>
        {children}
      </main>
    </div>
  )
}
