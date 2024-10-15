import { useState } from "react"
import { IDataSignatureAuth, signatureAuth } from "services/auth"
import { ethers } from "ethers"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { loginSuccess } from "@reducers/userSlice"

const useConnectWallet = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const login = async (input: IDataSignatureAuth) => {
    const res = await signatureAuth(input)
    if (res.data.accessToken && res.data.user) {
      dispatch(
        loginSuccess({
          user: res.data.user,
          accessToken: res.data.accessToken,
          expire: Date.now() + 24 * 60 * 60 * 1000,
        }),
      )
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      toast.warning("Please install MetaMask to continue!")
      return
    }
    const isTrustWalletDefault =
      window.ethereum.isTrust || window.ethereum.isTrustWallet
    if (isTrustWalletDefault) {
      toast.warning(
        "Trust Wallet is set to default, please turn off and reload page to use MetaMask!",
      )
      return
    }
    try {
      setLoading(true)

      const timestamp = Math.floor(Date.now() / 1000) + 86400
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      const publicAddress = await signer.getAddress()

      const domain = {}
      const types = {
        Data: [
          { name: "action", type: "string" },
          { name: "publicAddress", type: "address" },
          { name: "timestamp", type: "uint256" },
        ],
      }
      const value = {
        action: "login",
        publicAddress,
        timestamp,
      }

      const signature = await signer._signTypedData(domain, types, value)
      const digest = ethers.utils._TypedDataEncoder.hash(domain, types, value)
      const publicKey = ethers.utils.recoverPublicKey(digest, signature)

      const input: IDataSignatureAuth = {
        data: {
          action: "login",
          publicAddress,
          timestamp,
        },
        signData: {
          signature,
          publicKey,
        },
        typeLogin: "evm",
      }

      await login(input)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return { loading, connectWallet }
}

export default useConnectWallet
