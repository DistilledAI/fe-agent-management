import { combineReducers, Reducer } from "@reduxjs/toolkit"
import agentReducer, { AgentState } from "./chatbot/AgentSlice"

const rootReducer: Reducer<{
  agents: AgentState
}> = combineReducers({
  agents: agentReducer,
})

export default rootReducer
