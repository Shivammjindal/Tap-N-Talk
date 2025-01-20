"use client"

import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface MessageProps{

  id:string,
  register:UseFormRegister<FieldValues>,
  errors:FieldErrors,
  type?:string,
  required:boolean,
  placeholder:string

}

const MessageInput:React.FC<MessageProps> = ({
  id,
  type,
  register,
  required,
  placeholder,
  errors
}) => {
  return(
    <div className='relative w-full'>
      <input 
        // id defines name which we get when we revieve data
        id={id}
        type={type} 
        required={required}
        placeholder={placeholder}
        autoComplete={id}
        {...register(id,{required:required})}
        className='text-black font-light py-2 px-4 w-full rounded-md border-[1px] border-gray-500 focus:outline-none focus:border-[1px] focus:border-blue-400 transition duration-500'
      />
    </div>
  )
}

export default MessageInput