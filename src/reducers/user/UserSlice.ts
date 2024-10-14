import { TYPE_BOT } from "@constants/index"
import { createSlice } from "@reduxjs/toolkit"
import {
  storageKey,
  cachedLocalStorage,
  cachedSessionStorage,
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
  expire: number
}

interface UpdateUserPayload {
  user: IUser
}

export interface IUserState {
  user: IUser | null
  isLogin: boolean
}

const initStateValues = {
  user: {
    id: -1,
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
  },
  isLogin: !!cachedLocalStorage.getWithExpiry(storageKey.ACCESS_TOKEN),
}

const initialState: IUserState = initStateValues

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: { payload: LoginSuccessPayload }) => {
      cachedSessionStorage.removeItem(storageKey.ACCESS_TOKEN)

      const { user, accessToken, expire } = action.payload
      state.user = user
      state.isLogin = true
      cachedLocalStorage.setWithExpiry(
        storageKey.ACCESS_TOKEN,
        accessToken,
        expire,
      )
    },
    logout: (state) => {
      state.user = null
      state.isLogin = false
      cachedLocalStorage.removeItem(storageKey.ACCESS_TOKEN)
      cachedSessionStorage.removeItem(storageKey.ACCESS_TOKEN)
    },
    updateUser: (state, action: { payload: UpdateUserPayload }) => {
      state.user = action.payload.user
    },
  },
})

export const { loginSuccess, logout, updateUser } = userSlice.actions
export default userSlice.reducer
