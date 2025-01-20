import mongoose, { Document, InferSchemaType } from "mongoose";

export const ConversationSchama = new mongoose.Schema({
    lastMessageAt:{
        type:Date
    },
    name:{
        type:String
    },
    isGroup:{
        type:Boolean,
        default:false
    },
    messageIds:[
        {
            type:String
        }
    ],
    message:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'messages'
        }
    ],
    userIds:[
        {
            type:String
        }
    ],
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ]
},{
    timestamps:true
})

export type ConversationModelType = InferSchemaType<typeof ConversationSchama> & Document

export const Conversation = mongoose.models.conversations || mongoose.model<ConversationModelType>('conversations',ConversationSchama)