import { useState } from "react"
import { IDataSignatureAuth, signatureAuth } from "services/auth"
import { ethers } from "ethers"
import { toast } from "react-toastify"
import cachedLocalStorage, { storageKey } from "@utils/storage"

const useConnectWallet = () => {
  const [loading, setLoading] = useState(false)

  const login = async (input: IDataSignatureAuth) => {
    const res = await signatureAuth(input)
    if (res.data) {
      cachedLocalStorage.setWithExpiry(
        storageKey.ACCESS_TOKEN,
        res.data.accessToken,
        Date.now() + 24 * 60 * 60 * 1000,
      )
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.info("Please install MetaMask to continue.")
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
