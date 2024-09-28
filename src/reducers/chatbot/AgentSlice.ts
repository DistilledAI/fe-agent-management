import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

export const AGENT_TYPE = {
  MY_ECHO: "MY_ECHO",
} as any

export interface AgentState {
  agentType: string
}

const initStateValues = {
  agentType: AGENT_TYPE.MY_ECHO,
}

const initialState: AgentState = initStateValues

const AgentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    updateAgentType: (state, action: PayloadAction<AgentState>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { updateAgentType } = AgentSlice.actions

export default AgentSlice.reducer
