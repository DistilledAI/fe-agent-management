import { useEffect } from "react"
import useAuthState from "./useAuthState"
import useAuthAction from "./useAuthAction"

const useReconnectWallet = () => {
  const { isLogin, user } = useAuthState()
  const { logout } = useAuthAction()

  useEffect(() => {
    if (!window.ethereum || !isLogin) return

    const handleAccountsChanged = (accounts: Array<string>) => {
      const isReconnect = user && user.publicAddress !== accounts[0]
      if (isReconnect) {
        logout()
      }
    }
    window.ethereum.on("accountsChanged", handleAccountsChanged)

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [isLogin, user, logout])
}

export default useReconnectWallet
