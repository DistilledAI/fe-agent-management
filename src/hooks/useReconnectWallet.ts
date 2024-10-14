import { useEffect } from "react"
import useAuthState from "./useAuthState"
import useConnectWallet from "./useConnectWallet"
import { useDispatch } from "react-redux"
import { logout } from "@reducers/user/UserSlice"

const useReconnectWallet = () => {
  const { isLogin, user } = useAuthState()
  const { connectWallet } = useConnectWallet()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!window.ethereum || !isLogin) return

    const handleAccountsChanged = (accounts: Array<string>) => {
      const isReconnect = user && user.publicAddress !== accounts[0]
      if (isReconnect) {
        dispatch(logout())
        connectWallet()
      }
    }
    window.ethereum.on("accountsChanged", handleAccountsChanged)

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [isLogin, connectWallet, user, dispatch])
}

export default useReconnectWallet
