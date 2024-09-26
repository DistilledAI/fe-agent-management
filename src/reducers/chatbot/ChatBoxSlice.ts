import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

interface ChatBoxState {
  isChatBox?: boolean
  sid?: string
  isChatting?: boolean
}

const initStateValues = {
  isChatBox: false,
  sid: "",
  isChatting: false,
}

const initialState: ChatBoxState = initStateValues

const ChatBoxSlice = createSlice({
  name: "chatbox",
  initialState,
  reducers: {
    updateChatBox: (state, action: PayloadAction<ChatBoxState>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { updateChatBox } = ChatBoxSlice.actions

export default ChatBoxSlice.reducer
