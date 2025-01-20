import { Message } from "@/models";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/app/db/connection"

export async function POST(request:NextRequest ,response:NextResponse){

    try {

        await connect().then(() => console.log('User db connected'))

        const {
            conversationId
        } = await request.json()
        
        if(!conversationId){
            return new NextResponse('Invalid conversation id',{status:400});
        }

        const messages = await Message.find({
            conversationId
        })
        .populate({
            path:'sender'
        })
        .populate({
            path:'seen'
        })
        .sort(
            {createdAt:1}
        )
        
        return NextResponse.json({messages})
    } catch (error) {
        return new NextResponse('Internal Server Error',{status:500})
    }
    
}