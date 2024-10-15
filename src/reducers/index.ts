import { combineReducers, Reducer } from "@reduxjs/toolkit"
import agentReducer, { AgentState } from "./agentSlice"
import userReducer, { IUserState } from "./userSlice"

type TReducer = {
  agents: AgentState
  user: IUserState
}

const rootReducer: Reducer<TReducer> = combineReducers({
  agents: agentReducer,
  user: userReducer,
})

export default rootReducer
