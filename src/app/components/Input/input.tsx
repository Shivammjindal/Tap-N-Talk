'use client'

import clsx from "clsx"
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form"

interface InputProps{
    label: string,
    id: string,
    type?: string,
    required?: boolean,
    register: UseFormRegister<FieldValues>,
    errors?: FieldErrors,
    disabled?: boolean
}

const Input : React.FC<InputProps> = (
    {
        label,
        id,
        type,
        required,
        register,
        errors,
        disabled
    }
) => {
    return(
        <div>
            <input 
                className={clsx(`

                    text-[.8rem] 
                    lg:px-2
                    lg:p-[.4rem] 
                    md:text-[.8rem] 
                    lg:text-[1rem] 
                    rounded-lg 
                    p-[.3rem]
                    dark:bg-zinc-700
                    outline-none
                    focus:border-blue-500
                    focus:border-[.08rem]
                    focus:placeholder:text-zinc-300
                    ring-1
                    ring-gray-400
                    focus:ring-0`,
                    errors && "ring-1 ring-red-600",
                    disabled && "opacity-50"

                )}
                
                disabled={disabled} 
                id={id} 
                type={type} 
                {...register(id,{required:required})} 
                placeholder={label}
            />
        </div>
    )
}

export default Input