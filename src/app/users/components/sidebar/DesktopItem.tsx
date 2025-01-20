'use client'
import React from 'react'
import Link from 'next/link'
import clsx from 'clsx'

interface DesktopItemProps{
    label?:string,
    href?:string,
    onClick?:() => void,
    icon:any,
    active:boolean|undefined
}

const DesktopItem: React.FC<DesktopItemProps> = ({
    label,
    icon:Icon,
    active,
    href,
    onClick
}) => {

    const handleClick = () => {
        if(onClick)
            return onClick();
    }

    return (
        <li>
            <Link
                href={href!}
                className={clsx(`
                    group
                    flex
                    gap-x-3
                    rounded-md
                    p-2
                    text-sm
                    leading-6
                    font-semibold
                    hover:text-black
                    hover:bg-gray-200
                `,
                active&&'bg-gray-200 text-black',
                !active&&'text-gray-600'
            )}

            onClick={handleClick}
            >
                <Icon className="h-6 w-6 shrink-0"/>
            </Link>
            <span className='sr-only'>{label}</span>
        </li>
    )
}

export default DesktopItem