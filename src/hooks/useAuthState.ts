import { RootState } from "@configs/store"
import { useSelector } from "react-redux"

const useAuthState = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const isLogin = useSelector((state: RootState) => state.user.isLogin)

  return { user, isLogin }
}

export default useAuthState
