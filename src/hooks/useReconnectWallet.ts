import { useEffect } from "react"
import useAuthState from "./useAuthState"
import { useDispatch } from "react-redux"
import { logout } from "@reducers/user/UserSlice"

const useReconnectWallet = () => {
  const { isLogin, user } = useAuthState()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!window.ethereum || !isLogin) return

    const handleAccountsChanged = (accounts: Array<string>) => {
      const isReconnect = user && user.publicAddress !== accounts[0]
      if (isReconnect) {
        dispatch(logout())
      }
    }
    window.ethereum.on("accountsChanged", handleAccountsChanged)

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [isLogin, user, dispatch])
}

export default useReconnectWallet
