import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
interface ChatMsgState {
  chat_history: Array<any>
  message: string
  wallet_address: string
  interest_tokens: Array<any>
  id?: string
}

export const defaultChatMesgData = {
  chat_history: [],
  message: "",
  wallet_address: "",
  interest_tokens: [],
}

const initialState: ChatMsgState = defaultChatMesgData

const ChatMsgSlice = createSlice({
  name: "chat-messages",
  initialState,
  reducers: {
    updateChatMsg: (state, action: PayloadAction<ChatMsgState>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { updateChatMsg } = ChatMsgSlice.actions

export default ChatMsgSlice.reducer
