import { combineReducers } from "@reduxjs/toolkit"
import chatBoxReducer from "./chatbot/ChatBoxSlice"
import chatMsgReducer from "./chatbot/ChatMsgSlice"

const rootReducer = combineReducers({
  chatMsg: chatMsgReducer,
  chatBox: chatBoxReducer,
})

export default rootReducer
