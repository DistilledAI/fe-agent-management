import { ChatMsgData, ChatRoles } from "@pages/ChatBotOld/hooks/useChatMsg"
import { v4 as uuidv4 } from "uuid"

export const createChatMsg = (message: string): ChatMsgData => {
  const chatId = uuidv4()
  return {
    chat_history: [
      {
        role: ChatRoles.USER,
        content: message,
        id: chatId,
      },
      {
        role: ChatRoles.ASSISTANT,
        content: "",
        id: chatId,
      },
    ],
    message,
    wallet_address: "",
    interest_tokens: [],
  }
}
