import {NextRequest,NextResponse} from "next/server"
import getCurrentUser from "@/app/actions/getCurrentUser"
import { Message } from "@/models"
import { Conversation } from "@/models"
import { pusherServer } from "@/app/libs/pusher"
import { FullConversationType } from "@/types/model-types"
import { connect } from "@/app/db/connection"

export async function POST(request:NextRequest, response:NextResponse){

    try {

        await connect().then(() => console.log('User db connected'))
        
        const { user } = await getCurrentUser() || { user:null }
        const currUser = user
        const body = await request.json()

        // if(!user){
        //     return new NextResponse("No User available",{status: 401})
        // }

        const {
            message,
            image,
            conversationId
        } = body || {
            message : null,
            image : null,
            conversationId : null
        }

        if(!conversationId || !currUser?._id || !currUser.email){
            return new NextResponse('Unauthorised User',{ status:401 })
        }

        const newMessage = await Message.create({
            body:message,
            image:image,
            conversationId:conversationId,
            conversation:conversationId,
            sender: currUser._id,
            senderId: currUser._id,
            seenIds:[currUser._id],
            //the user who sends it imediately seen the message
            seen: [currUser._id]
        })

        await newMessage.populate([
            { path:'seen' },
            { path:'sender' }
        ])

        const updatedConversation:FullConversationType = await Conversation.findByIdAndUpdate({_id:conversationId},{
            lastMessageAt:new Date(),
            $push:{
                message:newMessage._id
            }
        },{ returnDocument:"after" }).populate([
            { path:'users' },
            { path:'message' }
        ])

        // //this helps in serving our chats 
        await pusherServer.trigger(conversationId,'new:message', newMessage)

        const lastMessage = updatedConversation.message[updatedConversation.message.length-1]

        // //this help in serving sidebars where we see's our conversation.
        updatedConversation.users.map(async (user) => {
            await pusherServer.trigger(user.email!, 'conversation:update',{
                id: conversationId,
                messages : lastMessage
            })
        })
        
        return NextResponse.json(newMessage)

    } catch (error:any) {
        console.log("Error Occured", error)
        return new NextResponse('Error Occured',{status:500})
    }
}