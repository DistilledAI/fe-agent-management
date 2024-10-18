import { combineReducers, Reducer } from "@reduxjs/toolkit"
import agentReducer, { AgentState } from "./chatbot/AgentSlice"
import userReducer, { IUserState } from "./user/UserSlice"
import activeColorReducer, { ActiveColorState } from "./activeColorSlice"

const rootReducer: Reducer<{
  agents: AgentState
  user: IUserState
  activeColor: ActiveColorState
}> = combineReducers({
  agents: agentReducer,
  user: userReducer,
  activeColor: activeColorReducer,
})

export default rootReducer
