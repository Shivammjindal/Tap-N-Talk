"use client"
import { Transition,Dialog, TransitionChild, DialogPanel, DialogTitle } from "@headlessui/react"
import { Fragment, useMemo, useState } from "react"
import Avatar from "../../../conversations/[userchat]/components/Profile"
import { UserModelType } from "@/models/user.model"
import { MdEdit } from "react-icons/md"
import axios from "axios"
import { CldUploadButton } from "next-cloudinary"
import { HiPhoto } from "react-icons/hi2"
import { useRouter } from "next/navigation"

interface ProfileSetupProps{
    user: UserModelType,
    setModelOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ProfileSetUp:React.FC<ProfileSetupProps> = ({user,setModelOpen}) => {

    const router = useRouter();
    const [image, setImage] = useState<string | null | undefined>(user?.image)
    const [name, setName] = useState<string>(user?.name)
    const [editing, setEditing] = useState<boolean>(true);

    const enableUpdate = useMemo(() => {
        if(name == user?.name && image == user?.image ) return true
        else false
    },[name,image])

    const handleUpdateProfile = async (data : {image:string | undefined | null, name:string}) => {

        const updatedData = {
            id: user._id,
            name: name,
            image: data.image,
        }

        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/users/update`, updatedData);
        router.push('/users');
    }

    return (
        <>
        <Transition show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => { setModelOpen(false) }}>
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
                <div className="fixed inset-0 overflow-y-scroll">
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
                            <div className='text-sm md:text-lg flex justify-center'>
                                Manage Your Profile
                            </div> 
                            </span> 
                        </DialogTitle>
                        <div className="flex flex-col mt-5 mb-4 items-center justify-center gap-3">
                            <div className="relative w-fit">
                                <div className="absolute z-40 right-2 top-4 md:right-1">

                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onSuccess={(result : any) => {
                                            const imageUrl = result?.info?.secure_url
                                            setImage(imageUrl)
                                            handleUpdateProfile({image: imageUrl , name:name})
                                        }}
                                        uploadPreset="ml_default"
                                    >
                                        <MdEdit className="rounded-full bg-gray-300 p-1"/>
                                    </CldUploadButton>

                                </div>
                                <div className="mt-4 flex gap-4 justify-center">
                                    <Avatar currentUser={ user }/>
                                </div>
                            </div>
                            
                            <div className="flex gap-1 justify-center items-center mt-3">
                                
                                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="px-1 text-center rounded-md disabled:bg-slate-100" disabled={editing}/>

                                <div className="bg-neutral-200 flex gap-1 items-center justify-center mx-1 px-1 rounded-md text-sm">
                                    <div className="text-sm py-1" onClick={ () => { setEditing(!editing) }}>
                                        <MdEdit/>
                                    </div>
                                </div>
                            </div>
                            <button className="bg-green-600 mt-6 hover:bg-green-700 transition duration-500 rounded-md px-2 py-1 disabled:cursor-not-allowed disabled:hover:bg-green-500 text-neutral-100" onClick={() => {
                                handleUpdateProfile({ image:image, name:name })
                            }} disabled={enableUpdate}>
                                Update
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

export default ProfileSetUp