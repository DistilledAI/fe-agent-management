import { loginSuccess } from "@reducers/userSlice"
import { ethers } from "ethers"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { IDataSignatureAuth, signatureAuth } from "services/auth"
import { useAccount } from "wagmi"
import useAuthAction from "./useAuthAction"
import useAuthState from "./useAuthState"

const useConnectWallet = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { address } = useAccount()
  // const { isMobile } = useWindowSize()
  const { isLogin } = useAuthState()
  const { logout } = useAuthAction()

  const login = async (input: IDataSignatureAuth) => {
    const res = await signatureAuth(input)
    if (res.data.accessToken && res.data.user) {
      if (isLogin) logout()
      dispatch(
        loginSuccess({
          user: res.data.user,
          accessToken: res.data.accessToken,
          expiry: Date.now() + 24 * 60 * 60 * 1000,
        }),
      )
    }
  }

  const withTimeout = (promise: any, timeoutMs: number) => {
    return Promise.race([
      promise,
      new Promise((_, reject) =>
        setTimeout(
          () => reject("Timeout after " + timeoutMs + " ms"),
          timeoutMs,
        ),
      ),
    ])
  }

  const getPublicAddress = async (signer: ethers.providers.JsonRpcSigner) => {
    try {
      const res = await withTimeout(signer.getAddress(), 2000)
      return res
    } catch (error) {
      console.log(error)
      return address
    }
  }

  const connectWallet = async () => {
    const isOwallet = window.ethereum.isOwallet
    // if (!window.ethereum || !window.ethereum.isMetaMask || !isOwallet) {
    //   if (isMobile) {
    //     toast.info("Please open the application in metamask's browser")
    //     setTimeout(() => {
    //       window.open(
    //         `https://metamask.app.link/dapp/${document.location.host}`,
    //         "_blank",
    //       )
    //     }, 1000)
    //     return
    //   }

    //   toast.warning("Please install MetaMask to continue!")
    //   return
    // }

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

      if (isOwallet) {
        try {
          await window.ethereum.request!({
            method: "wallet_switchEthereumChain",
            chainId: "0x01",
            params: [{ chainId: "0x01" }],
          })
          //@ts-ignore
          await window?.owallet.enable("0x01")
        } catch (error) {
          console.log("🚀 ~ connectWal ~ error:", error)
        }
      }

      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      const publicAddress = await getPublicAddress(signer)
      console.log("🚀 ~ connectWal ~ publicAddress:", publicAddress)

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

      let signature = (await signer._signTypedData(domain, types, value)) as any
      if (isOwallet) signature = signature?.result
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
      console.error(error, "error")
    } finally {
      setLoading(false)
    }
  }

  return { loading, connectWallet }
}

export default useConnectWallet
