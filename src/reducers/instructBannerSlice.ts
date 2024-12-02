import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = true

const instructBannerSlice = createSlice({
  name: "instruct-banner",
  initialState,
  reducers: {
    updateInstructBanner: (_, action: PayloadAction<boolean>) => {
      return action.payload
    },
  },
})

export const { updateInstructBanner } = instructBannerSlice.actions

export default instructBannerSlice.reducer
