import { NextRequest,NextResponse } from "next/server";
import { User } from "@/models/index";
import { connect } from "@/app/db/connection";

export const POST = async (request:NextRequest, response:NextResponse) => {

    try {

        await connect().then(() => console.log('User db connected'))

        const {email} = await request.json()
        const users = await User.find({
            $nor:[
                {email}
            ],
        }).sort({createdAt:-1})

        return NextResponse.json({
            users
        })
    } catch (error) {
        console.log('Error in All Users Route',error)
        return new NextResponse('Internal Server Error',{status:500})
    }
}