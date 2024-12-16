import { CoinGeckoId, CoinGeckoPrices } from "@hooks/useCoingecko"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

export interface PriceInfoState {
  price: string
  priceChange: string
  priceChangePercent: string
  currentRoundData: any
  liveRoundData: any
  tokenPrices: CoinGeckoPrices<CoinGeckoId> | null
}

const initialState: PriceInfoState = {
  price: "0",
  priceChange: "0",
  priceChangePercent: "0",
  currentRoundData: null,
  liveRoundData: null,
  tokenPrices: null,
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
    updatePriceTokens: (
      state,
      action: PayloadAction<Pick<PriceInfoState, "tokenPrices">>,
    ) => {
      state.tokenPrices = action.payload.tokenPrices
    },
  },
})

export const {
  updatePriceInfo,
  updateCurrentRound,
  updateLiveRound,
  updatePriceTokens,
} = priceInfo.actions

export default priceInfo.reducer
