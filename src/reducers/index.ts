import { combineReducers, Reducer } from "@reduxjs/toolkit"
import agentReducer, { AgentState } from "./agentSlice"
import connectWalletReducer from "./connectWalletSlice"
import firstLoginReducer from "./firstLoginSlice"
import instructBannerReducer from "./instructBannerSlice"
import priceInfoReducer, { PriceInfoState } from "./priceInfoSlice"
import cachePrice, { CachePriceState } from "./cachePrice"
import sidebarCollapsedReducer from "./sidebarCollapsedSlice"
import userReducer, { IUserState } from "./userSlice"

type TReducer = {
  agents: AgentState
  user: IUserState
  sidebarCollapsed: boolean
  connectWalletReducer: any
  instructBanner: boolean
  firstLogin: boolean
  priceInfo: PriceInfoState
  cachePrice: CachePriceState
}

const rootReducer: Reducer<TReducer> = combineReducers({
  agents: agentReducer,
  user: userReducer,
  sidebarCollapsed: sidebarCollapsedReducer,
  connectWalletReducer: connectWalletReducer,
  instructBanner: instructBannerReducer,
  firstLogin: firstLoginReducer,
  priceInfo: priceInfoReducer,
  cachePrice: cachePrice,
})

export default rootReducer
