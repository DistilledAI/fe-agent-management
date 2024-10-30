import { combineReducers, Reducer } from "@reduxjs/toolkit"
import sidebarCollapsedReducer from "./sidebarCollapsedSlice"
import agentReducer, { AgentState } from "./agentSlice"
import userReducer, { IUserState } from "./userSlice"

type TReducer = {
  agents: AgentState
  user: IUserState
  sidebarCollapsed: boolean
}

const rootReducer: Reducer<TReducer> = combineReducers({
  agents: agentReducer,
  user: userReducer,
  sidebarCollapsed: sidebarCollapsedReducer,
})

export default rootReducer
