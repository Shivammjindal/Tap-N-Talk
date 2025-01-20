import { NextRequest,NextResponse } from "next/server"
import { connect } from "@/app/db/connection"

export async function GET(request:NextRequest, response:NextResponse){

    // console.log(client)
    await connect().then(() => console.log('User db connected'))

    return NextResponse.json({
        message:"ok",
        status:200
    })
}