import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

export interface PriceInfoState {
  price: string
  priceChange: string
  priceChangePercent: string
  currentRoundData: any
  liveRoundData: any
}

const initialState: PriceInfoState = {
  price: "0",
  priceChange: "0",
  priceChangePercent: "0",
  currentRoundData: null,
  liveRoundData: null,
}

const priceInfo = createSlice({
  name: "priceInfo",
  initialState,
  reducers: {
    updatePriceInfo: (
      state,
      action: PayloadAction<
        Pick<PriceInfoState, "price" | "priceChange" | "priceChangePercent">
      >,
    ) => {
      state.price = action.payload.price
      state.priceChange = action.payload.priceChange
      state.priceChangePercent = action.payload.priceChangePercent
    },
    updateCurrentRound: (
      state,
      action: PayloadAction<Pick<PriceInfoState, "currentRoundData">>,
    ) => {
      state.currentRoundData = action.payload.currentRoundData
    },
    updateLiveRound: (
      state,
      action: PayloadAction<Pick<PriceInfoState, "liveRoundData">>,
    ) => {
      state.liveRoundData = action.payload.liveRoundData
    },
  },
})

export const { updatePriceInfo, updateCurrentRound, updateLiveRound } =
  priceInfo.actions

export default priceInfo.reducer
