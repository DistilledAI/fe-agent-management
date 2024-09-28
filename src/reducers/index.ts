import { combineReducers, Reducer } from "@reduxjs/toolkit"
import agentReducer, { AgentState } from "./chatbot/AgentSlice"
import userReducer, { IUserState } from "./user/UserSlice"

const rootReducer: Reducer<{
  agents: AgentState
  user: IUserState
}> = combineReducers({
  agents: agentReducer,
  user: userReducer,
})

export default rootReducer
