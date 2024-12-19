import { CoinGeckoId, CoinGeckoPrices } from "@hooks/useCoingecko"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

export interface CachePriceState {
  tokenPrices: CoinGeckoPrices<CoinGeckoId> | null
}

const initialState: CachePriceState = {
  tokenPrices: null,
}

const cachePrice = createSlice({
  name: "cachePrice",
  initialState,
  reducers: {
    updatePriceTokens: (
      state,
      action: PayloadAction<Pick<CachePriceState, "tokenPrices">>,
    ) => {
      state.tokenPrices = action.payload.tokenPrices
    },
  },
})

export const { updatePriceTokens } = cachePrice.actions

export default cachePrice.reducer
