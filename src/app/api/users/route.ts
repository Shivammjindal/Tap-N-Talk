import { NextRequest,NextResponse } from "next/server"
import { User } from "@/models"
import { connect } from "@/app/db/connection"

export async function POST(request:NextRequest, response:NextResponse){
    try {

        await connect().then(() => console.log('User db connected'))

        const { email } = await request.json()
        const user = await User.findOne({
            email
        })

        if(!user){
            return new NextResponse('Invalid Email', {status:404})
        }
        
        return NextResponse.json({
            user,
            status:200
        })
        
    } catch (error) {
        console.log("E://",error)
        return new NextResponse('Internal Server Error',{status:500})
    }
}