import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  isOpen: false,
}

const connectWalletModalSlice = createSlice({
  name: "sidebar-collapsed",
  initialState,
  reducers: {
    updateModalStatus: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isOpen: action.payload,
      }
    },
  },
})

export const { updateModalStatus } = connectWalletModalSlice.actions

export default connectWalletModalSlice.reducer
