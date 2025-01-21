"use client"
import useConversation from '@/app/hooks/useConversation'
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';
import { HiPaperAirplane } from 'react-icons/hi';
import { CldUploadButton } from "next-cloudinary"

function Form() {

    const { conversationId } = useConversation();
    const {
        register,
        handleSubmit,
        setValue,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message:''
        },
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        //reset the message back to nothing
        setValue('message','',{ shouldValidate: true })
        const { message } = data

        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/message`,{
            message,
            conversationId
        })
    }

    const handleUpload = (result:any) => {

        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/message`,{
            image:result?.info?.secure_url,
            // message:"image",
            conversationId
        })
    }

  return (
    <>
    <div
        className='
            py-4
            px-4
            bg-white
            border-t-[1px]
            flex
            items-center
            gap-2
            lg:gap-4
            w-full
        '
    >

        <CldUploadButton 
            options={{maxFiles:1}}
            onSuccess={handleUpload}
            uploadPreset='ml_default'
        >
            <HiPhoto size={30} className='text-sky-500'/> 
        </CldUploadButton>

        <form 
            onSubmit={handleSubmit(onSubmit)}
            className='flex items-center gap-2 lg:gap-4 w-full'
        >
            <MessageInput
                id="message"
                register={register}
                errors={errors}
                required
                type={"text"}
                placeholder="Write a Message"
            />
            <button 
                type="submit"
                className='
                    rounded-full
                    p-2
                    bg-sky-500
                    cursor-pointer
                    hover:bg-sky-600
                    transition
                    duration-500
                    rotate-90
                '
            >
                <HiPaperAirplane rotate={90} size={18} className='text-white'/>
            </button>
        </form>
    </div>
    </>
  )
}

export default Form