import { combineReducers, Reducer } from "@reduxjs/toolkit"
import activeColorReducer, { ActiveColorState } from "./activeColorSlice"
import agentReducer, { AgentState } from "./agentSlice"
import userReducer, { IUserState } from "./userSlice"

type TReducer = {
  agents: AgentState
  user: IUserState
  activeColor: ActiveColorState
}

const rootReducer: Reducer<TReducer> = combineReducers({
  agents: agentReducer,
  user: userReducer,
  activeColor: activeColorReducer,
})

export default rootReducer
