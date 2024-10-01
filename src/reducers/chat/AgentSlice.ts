import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

export interface AgentState {
  chatId: number | null
}

const initStateValues = {
  chatId: null,
}

const initialState: AgentState = initStateValues

const AgentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    updateAgent: (state, action: PayloadAction<AgentState>) => {
      state.chatId = action.payload.chatId
    },
  },
})

export const { updateAgent } = AgentSlice.actions

export default AgentSlice.reducer
