import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

export interface PriceInfoState {
  price: string
  priceChange: string
  priceChangePercent: string
  currentRoundData: any
}

const initialState: PriceInfoState = {
  price: "0",
  priceChange: "0",
  priceChangePercent: "0",
  currentRoundData: null,
}

const priceInfo = createSlice({
  name: "priceInfo",
  initialState,
  reducers: {
    updatePriceInfo: (
      state,
      action: PayloadAction<Partial<PriceInfoState>>,
    ) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { updatePriceInfo } = priceInfo.actions

export default priceInfo.reducer
