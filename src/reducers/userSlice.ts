import { initStore } from "@configs/store"
import { TYPE_BOT } from "@constants/index"
import { createSlice } from "@reduxjs/toolkit"
import {
  cachedLocalStorage,
  cachedSessionStorage,
  getAccessToken,
  storageKey,
} from "@utils/storage"

export interface IUser {
  id: number
  createdAt: string
  publicAddress: string
  role: number
  status: number
  typeLogin: string
  username: string
  avatar?: string
  description?: string
  owner?: number
  typeBot?: TYPE_BOT
  configBot?: string
}

interface LoginSuccessPayload {
  user: IUser
  accessToken: string
  expiry: number
}

interface UpdateUserPayload {
  user: IUser
}

export interface IUserState {
  user: IUser | null
  isLogin: boolean
}

const userInitState: IUser = {
  id: 0,
  createdAt: "",
  publicAddress: "",
  role: -1,
  status: -1,
  typeLogin: "",
  username: "",
  avatar: "",
  description: "",
  owner: -1,
  typeBot: -1,
  configBot: "",
}

const initStateValues = {
  user: userInitState,
  isLogin: !!getAccessToken(),
}

const initialState: IUserState = initStateValues

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: { payload: LoginSuccessPayload }) => {
      initStore(true)
      cachedSessionStorage.removeItem(storageKey.ACCESS_TOKEN)
      setTimeout(() => {
        cachedSessionStorage.removeItem("persist:root")
      }, 1000)

      const { user, accessToken, expiry } = action.payload
      state.user = user
      state.isLogin = true
      cachedLocalStorage.setWithExpiry(
        storageKey.ACCESS_TOKEN,
        accessToken,
        expiry,
      )
    },
    loginSuccessByAnonymous: (
      state,
      action: { payload: LoginSuccessPayload },
    ) => {
      const { user, accessToken, expiry } = action.payload

      initStore(false)
      setTimeout(() => {
        cachedLocalStorage.removeItem("persist:root")
      }, 1000)

      state.user = user
      state.isLogin = true
      cachedSessionStorage.setWithExpiry(
        storageKey.ACCESS_TOKEN,
        accessToken,
        expiry,
      )
    },
    logout: (state) => {
      state.user = userInitState
      state.isLogin = false
      cachedLocalStorage.removeItem(storageKey.ACCESS_TOKEN)
      cachedSessionStorage.removeItem(storageKey.ACCESS_TOKEN)
      cachedLocalStorage.removeItem("persist:root")
      cachedSessionStorage.removeItem("persist:root")
    },
    updateUser: (state, action: { payload: UpdateUserPayload }) => {
      state.user = action.payload.user
    },
  },
})

export const { loginSuccess, logout, updateUser, loginSuccessByAnonymous } =
  userSlice.actions
export default userSlice.reducer
