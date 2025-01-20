import { NextRequest,NextResponse } from "next/server";
import { Conversation } from "@/models";
import { connect } from "@/app/db/connection"

export async function POST(request:NextRequest, response:NextResponse){


    try { 

        await connect().then(() => console.log('User db connected'))

        const { conversationId } = await request.json();
        console.log("conversation ide : ",conversationId)

        if(!conversationId){
            new NextResponse('Invalid Data',{status:400})
        }

        const conversation = await Conversation.findOne({ _id: conversationId })
        .populate({
            path:'users',
        })

        return NextResponse.json(conversation)
    } catch (error:any) {
        return new NextResponse(error,{status:500})
    }
}