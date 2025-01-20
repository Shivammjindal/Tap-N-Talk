'use client'
import React from 'react'

function EmptySpace() {
  return (
    <div 
    className=
      'px-4 py-10 m-0 sm:px-6 lg:px-8 h-full flex bg-slate-200 justify-center items-center text-2xl font-semibold antialiased'
    >
      <div className='text-center flex flex-col justify-center items-center'>
        <h3
          className='mt-2 font-semibold text-2xl text-gray-900 antialiased'
        >Start a chat or start a new conversation</h3>
      </div>
    </div>
  )
}

export default EmptySpace