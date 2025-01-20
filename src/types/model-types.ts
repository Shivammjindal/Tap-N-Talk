import { ConversationModelType } from "@/models/conversation.model";
import { MessageModelType } from "@/models/message.model";
import { UserModelType } from "@/models/user.model";

export type FullMessageType = MessageModelType &
{
    sender: UserModelType,
    seen: UserModelType[],
}

export type FullConversationType = {
    users: UserModelType[],
    message: FullMessageType[]
} & ConversationModelType

export type SemiFullConversationType = {
    users: UserModelType[]
} & ConversationModelType