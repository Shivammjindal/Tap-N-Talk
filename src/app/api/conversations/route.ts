import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextRequest,NextResponse } from "next/server"
import { Conversation } from "@/models"
import { UserModelType } from "@/models/user.model"
import { pusherServer } from "@/app/libs/pusher"
import { connect } from "@/app/db/connection"

export async function POST(request:NextRequest, response:NextResponse){
    try {

        await connect().then(() => console.log('User db connected'))

        const { user } = await getCurrentUser() || { user : null }
        const body = await request.json()
        const {
            userId,
            isGroup,
            members,
            name
        } = body

        const currUser = user

        if(!user || !currUser?.id && !currUser?.email){
            return new NextResponse('Unauthorised User',{status:401})
        }

        if(isGroup && (!members || members.length < 2 || !name)){
            return new NextResponse('Invalid Data', {status:400})
        }
        
        if(isGroup){
            const newConversation = await Conversation.create({
                name,
                isGroup,
                users: members.map((member:UserModelType) => member._id),
                userIds: members.map((member:UserModelType) => member._id)
            })
            
            await newConversation.populate('users')

            // console.log('New Conversation Found',newConversation)

            newConversation.users.forEach((user:UserModelType) => {
                if(user.email){
                    console.log('sending triggers',user.email)
                    pusherServer.trigger(user.email,'conversation:new',newConversation)
                }
            })
            
            return NextResponse.json({newConversation})
        }

        const existingConversation = await Conversation.findOne({
            $or:[
                {
                    userIds:[currUser._id, userId]
                },
                {
                    userIds:[userId, currUser._id]
                }
            ]
        })

        if(existingConversation){
            console.log('ExistingUser Found')
            return NextResponse.json(existingConversation)
        }

        const newConversation = await Conversation.create(
            {
                userIds:[currUser._id, userId],
                users:[currUser._id, userId]
            }
        )

        await newConversation.populate('users')
        newConversation.users.forEach((user:UserModelType) => {
            if(user.email){
                pusherServer.trigger(user.email,'conversation:new',newConversation)
            }
        })

        return NextResponse.json(newConversation)

    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error',{status:500})
    }
}