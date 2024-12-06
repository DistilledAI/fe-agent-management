import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = false

const firstLoginSlice = createSlice({
  name: "first-login",
  initialState,
  reducers: {
    updateFirstLogin: (_, action: PayloadAction<boolean>) => {
      return action.payload
    },
  },
})

export const { updateFirstLogin } = firstLoginSlice.actions

export default firstLoginSlice.reducer
