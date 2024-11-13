import { useEffect } from "react"
import useAuthAction from "./useAuthAction"
import useAuthState from "./useAuthState"

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

    if (window.ethereum.on)
      window.ethereum.on("accountsChanged", handleAccountsChanged)

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [isLogin, user])
}

export default useReconnectWallet
