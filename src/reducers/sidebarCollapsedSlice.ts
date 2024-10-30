import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = false

const sidebarCollapsedSlice = createSlice({
  name: "sidebar-collapsed",
  initialState,
  reducers: {
    updateSidebarCollapsed: (_, action: PayloadAction<boolean>) => {
      return action.payload
    },
  },
})

export const { updateSidebarCollapsed } = sidebarCollapsedSlice.actions

export default sidebarCollapsedSlice.reducer
