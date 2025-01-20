import { Conversation } from "@/models"
import { FullConversationType } from "@/types/model-types"
import { NextRequest,NextResponse } from "next/server"
import { connect } from "@/app/db/connection"

export async function POST(request:NextRequest, response:NextResponse){
    try {

        await connect().then(() => console.log('User db connected'))
        const body = await request.json();

        if(!body.userId) {
            return new NextResponse("No User Info",{status: 400})
        }

        const { userId } = body

        if(!userId){
            return NextResponse.json({"message":"No User"})
        }

        const conversation:FullConversationType[] = await Conversation.find({
            userIds:userId
        })
        .sort({lastMessageAt:-1})
        .populate({
            path:'users'
        })
        .populate({
            path:'message',
        })
        
        return NextResponse.json(
            conversation
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json({err:error, status:500})
    }
}