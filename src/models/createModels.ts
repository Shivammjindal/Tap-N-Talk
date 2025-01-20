import mongoose from "mongoose"
import { UserModelType, UserSchema } from "./user.model"
import { MessageModelType, messageSchema } from "./message.model"
import { ConversationModelType, ConversationSchama } from "./conversation.model"
import { User } from "."
import { Message } from "."
import { Conversation } from "."

export const createModels = () => {
    User || mongoose.model<UserModelType>("users",UserSchema)
    Message || mongoose.model<MessageModelType>("messages",messageSchema)
    Conversation || mongoose.model<ConversationModelType>("conversations",ConversationSchama)
}