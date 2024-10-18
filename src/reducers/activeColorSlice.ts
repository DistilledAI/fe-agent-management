import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ActiveColorState {
  bgColor?: string
  borderColor?: string
}

const initialState: ActiveColorState = {
  bgColor: "",
  borderColor: "",
}

const activeColorSlice = createSlice({
  name: "active-color",
  initialState,
  reducers: {
    updateActiveColor: (state, action: PayloadAction<ActiveColorState>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { updateActiveColor } = activeColorSlice.actions

export default activeColorSlice.reducer
