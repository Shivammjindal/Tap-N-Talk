"use client"
import React from 'react'
import { IconType } from 'react-icons'

interface AuthSocialIcon{
    icon: IconType,
    onClick: () => void
}

const AuthSocialButton:React.FC<AuthSocialIcon> = ({icon:Icon,onClick}) => {
  return (
    <button
        type='button'
        onClick={onClick}
        className='
            flex
            justify-center
            text-gray-400
            w-full
            ring-inset
            ring-[.09rem]
            ring-gray-400
            py-1
            rounded-sm
        '
    >
        <Icon/>
    </button>
  )
}

export default AuthSocialButton