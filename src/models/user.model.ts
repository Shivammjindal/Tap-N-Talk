import mongoose, { Document } from "mongoose";
import { InferSchemaType } from "mongoose"

export const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    hashedPassword:{
        type:String,
    },
    emailVarified:{
        type:Boolean,
        required:true,
        default:false
    },
    image:{
        type:String,
        default:'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'
    },
    conversationsIds:[
        {
            type:String
        }
    ],
    conversations:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"conversations"
        }
    ],
    seenMessagesIds:[
        {
            type:String
        }
    ],
    seenMessages:[
        // reference of message model todo
        {
            type:String
        }
    ],
    accounts:[
        // reference of message schema
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"accounts"
        }
    ],
    messages:[
        //reference of message schema
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"messages"
        }
    ]
},{
    timestamps:true
})

export type UserModelType = InferSchemaType<typeof UserSchema> & Document

// export const User = mongoose.models.messages || mongoose.model<UserModelType>('users',UserSchema)