import mongoose from "mongoose";
import { UserModelType,UserSchema } from "./user.model";
import { MessageModelType, messageSchema } from "./message.model";
import { ConversationModelType, ConversationSchama } from "./conversation.model";
import { AccountModelType, AccountSchema } from "./account.model";



export const User = mongoose.models.users || mongoose.model<UserModelType>("users",UserSchema)
export const Message = mongoose.models.messages || mongoose.model<MessageModelType>('messages',messageSchema)
export const Conversation = mongoose.models.conversations || mongoose.model<ConversationModelType>('conversations',ConversationSchama)
export const Account = mongoose.models.messages || mongoose.model<AccountModelType>('accounts',AccountSchema)