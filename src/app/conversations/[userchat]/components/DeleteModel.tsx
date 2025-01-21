'use client'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { IoWarning } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import axios from 'axios'

interface DeleteModelProps{
  setModelOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function MyModal({setModelOpen}:DeleteModelProps) {

  const { userchat }:any = useParams()
  const router = useRouter()

  const handleChatDelete = async () => {
      console.log("Delete Chat in Progress ")
      const data = {
        conversationId:userchat
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/deleteConversation`,data)
      router.push('/conversations')
  }

  console.log("params ",userchat)

  return (
    <>
    { <div className='fixed z-40'>

      <Transition appear show={true} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {setModelOpen(false)}}>
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
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="leading-6 text-gray-900"
                  >
                    <span className='flex text-sm items-center gap-1'>
                      <IoWarning className='text-red-600 hidden sm:block text-lg md:text-lg ' />
                      <div className='text-sm md:text-lg '>
                        Are you sure you want to delete this Chat?
                      </div> 
                    </span> 
                  </DialogTitle>
                  <div className="mt-4 flex gap-4 justify-center">
                    <button
                      type="button"
                      className="flex justify-center text-sm md:text-md rounded-md border border-transparent bg-red-100 px-2 py-1 md:px-4 md:py-2 font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        handleChatDelete();
                      }}
                    >
                      Yes&apos;s I am Sure
                    </button>
                    <button
                      type="button"
                      className="flex justify-center text-sm md:text-md rounded-md border border-transparent bg-green-100 px-2 py-1 md:px-4 md:py-2 font-medium text-green-800 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setModelOpen(false)
                      }}
                    >
                      Go Back!
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
      </div>}
    </>
  )
}