import { RootState } from "@configs/store"
import { RoleUser } from "@constants/index"
import { cachedSessionStorage, storageKey } from "@utils/storage"
import { useSelector } from "react-redux"

const useAuthState = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const isLoggedIn = useSelector((state: RootState) => state.user.isLogin)
  const sessionAccessToken = cachedSessionStorage.getWithExpiry(
    storageKey.ACCESS_TOKEN,
  )

  const isAnonymous = user?.role === RoleUser.ANONYMOUS
  const isOverStatusLoginWithAnonymous =
    isAnonymous && isLoggedIn && !sessionAccessToken
  const isLogin = isOverStatusLoginWithAnonymous ? false : isLoggedIn

  return { user, isLogin, sessionAccessToken }
}

export default useAuthState
