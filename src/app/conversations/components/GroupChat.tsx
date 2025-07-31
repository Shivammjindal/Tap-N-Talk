"use client"
import { UserModelType } from '@/models/user.model'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { InputList } from './InputList'
import { useAppSelector } from '@/app/hooks/redux'
import { MdDelete } from 'react-icons/md'
import { useAppDispatch } from '@/app/hooks/redux'
import { removeMember } from '@/app/groupSlice'
import { resetMember } from '@/app/groupSlice'
import getCurrentUserClient from '@/app/actions/getCurrUserFrontend'
import { useSession } from "next-auth/react"
import axios from 'axios'

interface GroupChatProps{
  users: UserModelType[],
  setActive: React.Dispatch<React.SetStateAction<boolean>>,
  active: boolean
}

export default function GroupChatModel({ users,active,setActive }:GroupChatProps) {

  const selector = useAppSelector(state => state.groupchat)
  const [name, setName] = useState<string>('')
  const dispatch = useAppDispatch()
  const { data } = useSession()

  const removeHandler = (e:UserModelType) => {
    dispatch(removeMember(e?._id))
  }

  const createGroup = async () => {
    
    const { user } = await getCurrentUserClient(data?.user?.email!)
    const users = [...selector,user]

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/conversations`,{
      isGroup: true,
      members: users,
      name : name
    })
    
    setActive(false)
    dispatch(resetMember()); 
  }

  return (
    <>
      <Transition appear show={active} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {
          setActive(false)
        }}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full flex flex-col gap-3 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all border-[1px]">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create a New Group
                  </DialogTitle>

                  <div>
                    <input type="text" name="" id="" className='focus:outline-none ring-1 ring-gray-300 rounded-md py-1 px-2' onChange={(e) => {setName(e.target.value)}} placeholder='Group Name'/>
                  </div>
                  <div> 
                    <InputList users={users}/>
                  </div>
                   
                  <div className="mt-2">
                    <div className="text-sm text-gray-600 flex gap-1">
                      {
                        selector?.map((user:UserModelType) => {
                          return (
                            <div key={user.email} className='items-center text-base'>
                              <div className='flex mx-1 p-1 gap-1 text-lg items-center w-full'>
                                {user.name}
                                <button onClick={(e) => {removeHandler(user)}}>
                                  <MdDelete/>
                                </button>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-200 px-2 py-1 text-sm font-medium text-green-900 hover:bg-green-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-all duration-500"
                      onClick={() => { createGroup()}}
                    >
                      Create
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
