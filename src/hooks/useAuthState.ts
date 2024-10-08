import { RootState } from "@configs/store"
import { cachedSessionStorage, storageKey } from "@utils/storage"
import { useSelector } from "react-redux"

const useAuthState = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const isLoggedIn = useSelector((state: RootState) => state.user.isLogin)
  const sessionAccessToken = cachedSessionStorage.getWithExpiry(
    storageKey.ACCESS_TOKEN,
  )
  const isLogin = sessionAccessToken ? true : isLoggedIn

  return { user, isLogin, sessionAccessToken }
}

export default useAuthState
