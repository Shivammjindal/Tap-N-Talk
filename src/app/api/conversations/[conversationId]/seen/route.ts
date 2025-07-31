import getCurrentUser from "@/app/actions/getCurrentUser";
import { Conversation, Message } from "@/models";
import { NextRequest,NextResponse } from "next/server";
import { FullConversationType } from "@/types/model-types";
import { pusherServer } from "@/app/libs/pusher";
import { connect } from "@/app/db/connection"

interface IParams{
    conversationId?:string
}

export async function POST(request:NextRequest,{ params } : { params: IParams }, response:NextResponse){
    
    try {

        await connect().then(() => console.log('User db connected'))

        const { user } = await getCurrentUser() || { user : null }
        const currentUser = user
        const { conversationId } = params

        if(!currentUser){
            return new NextResponse("No User Available",{status:200})
        }

        if(!currentUser?.email){
            return new NextResponse('Unauthorized',{ status:401 })
        }

        if(!conversationId){
            return new NextResponse('Invalid Conversation Id',{ status:400 })
        }

        const conversations = await Conversation.find({_id:conversationId}).populate({path:'message'}).populate({path:'users'})

        const conversation:FullConversationType = conversations[0]

        if(!conversation){
            return new NextResponse('Invalid Credentials',{ status:400 })
        }

        //find last message
        const lastMessage = conversation.message[conversation.message.length-1]

        if(!lastMessage){
            return NextResponse.json(conversation);
        }

        let check = false;

        for(let i = 0; i < lastMessage.seenIds.length; i++){
            if(lastMessage.seenIds[i] === currentUser._id){
                check = true;
            }
        }

        if(check){
            return NextResponse.json({msg:'Already Seen The Messages'})
        }

        // update seen of last message
        const updateMessage = await Message.findOneAndUpdate({
            _id:lastMessage._id
        },{
            $push:{
                seen:currentUser._id,
                seenIds:currentUser._id
            }
        },{returnDocument:"after"}).populate([
            { path:'seen' },
            { path:'sender' }
        ])

        const updateMessageUnPopulated = await Message.findOneAndUpdate({
            _id:lastMessage._id
        },{
            $push:{
                seen:currentUser._id,
                seenIds:currentUser._id
            }
        },{returnDocument:"after"})

        await pusherServer.trigger(user.email,'conversation:update',{
            id:conversationId,
            messages:updateMessageUnPopulated
        })
        
        if(lastMessage.seenIds.indexOf(currentUser._id) !== -1){
            return NextResponse.json(conversation)
        }

        await pusherServer.trigger(conversationId!,'message:updated',updateMessage)

        return NextResponse.json(updateMessage)
    } catch (error) {
        
        return new NextResponse('Intersal Server Error in Seen Route', { status:500 })
    }
}