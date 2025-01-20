"use client"
import React, { useCallback, useState, useEffect } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import Input from '@/app/components/Input/input'
import AuthSocialButton from './AuthSocialButton'
import { BsGithub,BsGoogle } from 'react-icons/bs'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import axios from "axios"
import toast from 'react-hot-toast'

type Varient = "LOGIN" | "REGISTER"

function AuthForm() {
  const router = useRouter();
  const session = useSession();
  const [ varient, setVarient ] = useState<Varient>("LOGIN")
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    if(session?.status === "authenticated"){
      console.log('authenticated')
      router.push('/users')
    }
    //dependencies m jis cheej k change hone s exact change krna ho vhi dale. pura object pass n kre
  },[session?.status])

  const {register, handleSubmit, formState:{errors}} = useForm<FieldValues>({})
  // jo submit handler hai vo hme values provide krane ka kam krta hai. Jo form m input hui hai.
  const onSubmit:SubmitHandler<FieldValues> = async (data) => {
    setLoading(true)
    if(varient === "REGISTER"){
      await axios.post('http://localhost:3000/api/register',data)
      .then(() =>{
        console.log("User Register Successfully")
        toast.success("User Registration Successfully")
        signIn("credentials",data)
      })
      .catch(() => {
        console.log("User Registration Failure")
        toast.error("Invalid Inputs Plase Try Again")
      })
    }

    if(varient === "LOGIN"){
      signIn('credentials',{
        ...data,
        redirect:false
      })
      .then((callback) => {
        if(callback?.error){
          console.log('unable to login')
          toast.error("Invalid Credentials Unable to Login")
        }
        if(callback?.ok && !callback?.error){
          console.log('loggin success')
          toast.success("Logged in Successfully")
        }
      })
      .finally(() => {
        setLoading(false)
      })
    }

    setLoading(false)
  }

  const socialAction = (action :string) => {
    setLoading(true)
    signIn(action, 
      { redirect:false })
      .then((callback) => {
        if(callback?.error){
          console.log('Error Occured in Loggin in with Github')
          toast.error('Unable To Login Please Try Again')
        }
        if(!callback?.error && callback?.ok){
          console.log('Logged in Successfully')
          toast.success("Logged in Successfully")
        }
      }
    )
    .finally(() => {
      setLoading(false)
    })
  }

  const toggleVarient = useCallback(() => {
    if(varient === "LOGIN"){
      setVarient("REGISTER")
    }
    else{
      setVarient("LOGIN")
    }
  },[varient])

  return (
    <>
      <div className='bg-white px-4 py-2 rounded-lg min-h-80 flex flex-col justify-center items-center min-w-64'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center gap-1'>

          {varient === "REGISTER" && <Input 

            label='Name'
            register={register}
            id='name'
            disabled={loading}
            required={true}

          />}

          <Input 
            
            label='Email' 
            register={register} 
            id='email' 
            disabled={loading} 
            required={true}

          />

          <Input

            label='Password'
            register={register}
            id='password'
            disabled={loading}

          />

          <input

            className='
              text-white 
              md:text-[1.1rem] 
              lg:px-2 p-[.3rem] 
              text-[.9rem] 
              mt-2 
              rounded-lg  
              bg-blue-600 
              disabled:bg-blue-500 
              disabled:cursor-not-allowed 
              sm:text-md
              hover:bg-indigo-600
              transition-all
              duration-1000
              w-full
            '

            type='submit'
            value={varient === "REGISTER" ? "Sign Up" : "Login"}
            disabled={loading} 
          />
        
        </form>
        <div className='relative mt-6 w-full'>
          <div className='w-full'>
            <div
              className='flex items-center w-full'
            >
              <div className='w-full border-t-[.094rem] border-gray-400'></div>
              <div className='absolute left-12 flex justify-center text-sm'>
                <div className='bg-white px-2 w-full text-gray-400'>
                  or continue with
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-8 w-3/4 md:w-5/6 flex flex-col md:flex-row gap-2'>
          <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')}/>
          <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')}/>
        </div>
        <div 
        className='mt-6 dark:text-slate-100 text-sm font-light tracking-tight'>

          {varient === "REGISTER" ? "Already have an Account? " : "Don't have an Account? " }
          <span 
            className='text-blue-600 cursor-pointer hover:underline ' 
            onClick={toggleVarient}>
              {varient === "REGISTER" ? "Login" : "SignUp" }
          </span>
        </div>
        
      </div>
      
    </>
  )
}

export default AuthForm




















// interface Inputs{
//   emial:string,
//   password:string
// }
// type Inputsa = {
//   email:string,
//   password:string
// }

// type Inputs = {
//   example: string,
//   exampleRequired: string,
// };



{/*       <input 
            placeholder='Email' 
            {...register("email", { required: true })} 
            className='text-[.9rem] md:text-[1.1rem] lg:text-[1.1rem] rounded-lg p-[.3rem] dark:bg-zinc-700'
          />
          <input 
            placeholder='Password' 
            {...register("password", {required:true})} 
            className='rounded-lg text-[.9rem] md:text-[1.1rem] p-[.3rem] dark:bg-zinc-700'
          />
          <input 
            type="submit" 
            value={varient === "REGISTER" ? "Sign Up" : "Login"}
            disabled={loading} 
            className='text-white md:text-[1.1rem] lg:px-2 p-[.3rem] text-[.9rem] mt-2 rounded-lg  bg-blue-600 disabled:bg-blue-500 disabled:cursor-not-allowed sm:text-md'
          /> */}