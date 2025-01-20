import { NextRequest, NextResponse } from "next/server"
import { Conversation } from "@/models"
import { SemiFullConversationType } from "@/types/model-types";
import { pusherServer } from "@/app/libs/pusher";
import { connect } from "@/app/db/connection";

export async function POST(request:NextRequest, response:NextResponse) {
    try {   
        await connect().then(() => console.log('User db connected'))
        
        const { conversationId } = await request.json();

        if(!conversationId){
            return new NextResponse('Invalid Data',{ status: 400})
        }

        const existingConversation:SemiFullConversationType = await Conversation.findOne({_id: conversationId}).populate('users');

        existingConversation.users.forEach((user) => {
            if(user.email){
                pusherServer.trigger(user.email,'conversation:remove',{
                    id: existingConversation._id
                })
            }
        })

        await Conversation.findOneAndDelete({
            _id: conversationId
        });

        return NextResponse.json({message:'conversation deleted successfully'})
    } catch (error) {
        return new NextResponse('Internal Server Error',{status:500})
    }
}