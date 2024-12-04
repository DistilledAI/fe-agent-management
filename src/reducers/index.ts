import { combineReducers, Reducer } from "@reduxjs/toolkit"
import agentReducer, { AgentState } from "./agentSlice"
import connectWalletReducer from "./connectWalletSlice"
import sidebarCollapsedReducer from "./sidebarCollapsedSlice"
import instructBannerReducer from "./instructBannerSlice"
import userReducer, { IUserState } from "./userSlice"
import priceInfoReducer, { PriceInfoState } from "./priceInfoSlice"

type TReducer = {
  agents: AgentState
  user: IUserState
  sidebarCollapsed: boolean
  connectWalletReducer: any
  instructBanner: boolean
  priceInfo: PriceInfoState
}

const rootReducer: Reducer<TReducer> = combineReducers({
  agents: agentReducer,
  user: userReducer,
  sidebarCollapsed: sidebarCollapsedReducer,
  connectWalletReducer: connectWalletReducer,
  instructBanner: instructBannerReducer,
  priceInfo: priceInfoReducer,
})

export default rootReducer
