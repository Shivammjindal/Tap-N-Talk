import mongoose, { Document, InferSchemaType } from "mongoose";

export const messageSchema = new mongoose.Schema({
    body:{
        type:String
    },
    image:{
        type:String,
    },
    seenIds:[
        {
            type:String
        }
    ],
    seen:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        }
    ],
    conversationId:{
        type:String
    },
    conversation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"conversations"
    },
    senderId:{
        type:String
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},
{
    timestamps:true
})

export type MessageModelType = InferSchemaType<typeof messageSchema> & Document

export const Message = mongoose.models.messages || mongoose.model<MessageModelType>('messages',messageSchema)