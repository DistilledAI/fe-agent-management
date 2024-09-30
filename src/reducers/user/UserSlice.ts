import { createSlice } from "@reduxjs/toolkit"
import cachedLocalStorage, { storageKey } from "@utils/storage"

export interface IUser {
  id: number
  createdAt: string
  publicAddress: string
  role: number
  status: number
  typeLogin: string
  username: string
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
  user: null,
  isLogin: !!cachedLocalStorage.getWithExpiry(storageKey.ACCESS_TOKEN),
}

const initialState: IUserState = initStateValues

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: { payload: LoginSuccessPayload }) => {
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
    },
    updateUser: (state, action: { payload: UpdateUserPayload }) => {
      state.user = action.payload.user
    },
  },
})

export const { loginSuccess, logout, updateUser } = userSlice.actions
export default userSlice.reducer
