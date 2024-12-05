import { updateModalStatus } from "@reducers/connectWalletSlice"
import { loginSuccess } from "@reducers/userSlice"
import { ethers } from "ethers"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import { IDataSignatureAuth, signatureAuth } from "services/auth"
import { postReferralCode } from "services/user"
import { useAccount } from "wagmi"
import useAuthAction from "./useAuthAction"
import useAuthState from "./useAuthState"
import useWindowSize from "./useWindowSize"

export const WALLET_TYPE = {
  META_MASK: "META_MASK",
  OWALLET: "OWALLET",
}

const useConnectWallet = () => {
  const [searchParams] = useSearchParams()
  const referralCode = searchParams.get("invite") || ""
  const [loadingConnectMetamask, setLoadingConnectMetamask] =
    useState<boolean>(false)
  const [loadingConnectPhantom, setLoadingConnectPhantom] =
    useState<boolean>(false)
  const [loadingConnectOwallet, setLoadingConnectOwallet] =
    useState<boolean>(false)
  const dispatch = useDispatch()
  const { address } = useAccount()
  const { isMobile } = useWindowSize()
  const { isLogin } = useAuthState()
  const { logout } = useAuthAction()

  const connectMultipleWallet = () => {
    dispatch(updateModalStatus(true))
  }

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
    await postReferralCode(referralCode)
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

  const connectOwallet = async () => {
    //@ts-ignore
    const isOwallet = window.owallet.isOwallet

    if (!isOwallet) {
      if (isMobile) {
        const deepLinkApp = "https://owallet.io/"
        toast.info(`Please open the application in owallet's browser`)
        setTimeout(() => {
          window.open(deepLinkApp, "_blank")
        }, 1000)
        return
      }

      toast.warning(`Please install Owallet to continue!`)
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
      setLoadingConnectOwallet(true)
      const timestamp = Math.floor(Date.now() / 1000) + 86400
      //@ts-ignore

      const provider = new ethers.providers.Web3Provider(
        //@ts-ignore
        isMobile ? window.ethereum : window.eth_owallet,
      )
      //@ts-ignore
      if (isMobile) {
        await window.ethereum.request!({
          method: "wallet_switchEthereumChain",
          chainId: "0x01",
          params: [{ chainId: "0x01" }],
        })
      } else {
        //@ts-ignore
        await window.eth_owallet.request!({
          method: "wallet_switchEthereumChain",
          chainId: "0x01",
          params: [{ chainId: "0x01" }],
        })
      }
      //@ts-ignore
      await window?.owallet.enable("0x01")

      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      const publicAddress = await getPublicAddress(signer)

      const domain = {}
      const types = {
        Data: [
          { name: "action", type: "string" },
          { name: "publicAddress", type: "address" },
          { name: "timestamp", type: "uint256" },
        ],
      }
      const value = {
        action: "Login to Distilled",
        publicAddress,
        timestamp,
      }

      let signature = (await signer._signTypedData(domain, types, value)) as any
      signature = signature?.result
      const digest = ethers.utils._TypedDataEncoder.hash(domain, types, value)
      const publicKey = ethers.utils.recoverPublicKey(digest, signature)

      const input: IDataSignatureAuth = {
        data: {
          action: "Login to Distilled",
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
      dispatch(updateModalStatus(false))
    } catch (error) {
      console.error(error, "error")
    } finally {
      setLoadingConnectOwallet(false)
    }
  }

  const connectMetamaskWallet = async () => {
    const isMetaMaskWallet = window.ethereum.isMetaMask

    if (!isMetaMaskWallet) {
      if (isMobile) {
        const deepLinkApp = `https://metamask.app.link/dapp/${document.location.host}`
        toast.info(`Please open the application in metamask's browser`)
        setTimeout(() => {
          window.open(deepLinkApp, "_blank")
        }, 1000)
        return
      }

      return toast.warning(`Please install Metamask to continue!`)
    }

    try {
      setLoadingConnectMetamask(true)

      const timestamp = Math.floor(Date.now() / 1000) + 86400
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      const publicAddress = await getPublicAddress(signer)

      const domain = {}
      const types = {
        Data: [
          { name: "action", type: "string" },
          { name: "publicAddress", type: "address" },
          { name: "timestamp", type: "uint256" },
        ],
      }
      const value = {
        action: "Login to Distilled",
        publicAddress,
        timestamp,
      }

      const signature = (await signer._signTypedData(
        domain,
        types,
        value,
      )) as any
      const digest = ethers.utils._TypedDataEncoder.hash(domain, types, value)
      const publicKey = ethers.utils.recoverPublicKey(digest, signature)

      const input: IDataSignatureAuth = {
        data: {
          action: "Login to Distilled",
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
      dispatch(updateModalStatus(false))
    } catch (error) {
      console.error(error, "error")
    } finally {
      setLoadingConnectMetamask(false)
    }
  }

  const getProvider = () => {
    if ("solana" in window) {
      const provider = (window as any).solana
      if (provider.isPhantom) {
        return provider
      }
    }

    return null
  }

  const connectPhantomWallet = async () => {
    //@ts-ignore
    const isPhantomInstalled = window.phantom?.solana?.isPhantom
    const provider = getProvider()

    if (!isPhantomInstalled || !provider) {
      if (isMobile) {
        const deepLinkApp = "https://phantom.app/download"
        toast.info(`Please open the application in phantom's browser`)
        setTimeout(() => {
          window.open(deepLinkApp, "_blank")
        }, 1000)
        return
      }

      return toast.warning(`Please install Phantom to continue!`)
    }

    try {
      setLoadingConnectPhantom(true)
      const timestamp = Math.floor(Date.now() / 1000) + 86400
      await provider.connect()

      //@ts-ignore
      const accounts = await window?.phantom.ethereum.request({
        method: "eth_requestAccounts",
        params: [],
      })

      const publicAddress = accounts[0]

      const domain = {}
      const types = {
        Data: [
          { name: "action", type: "string" },
          { name: "publicAddress", type: "address" },
          { name: "timestamp", type: "uint256" },
        ],
      }
      const value = {
        action: "Login to Distilled",
        publicAddress,
        timestamp,
      }

      const providerEther = new ethers.providers.Web3Provider(window.ethereum)
      const signer = providerEther.getSigner()

      const signature = (await signer._signTypedData(
        domain,
        types,
        value,
      )) as any

      const digest = ethers.utils._TypedDataEncoder.hash(domain, types, value)
      const publicKey = ethers.utils.recoverPublicKey(digest, signature)

      const input: IDataSignatureAuth = {
        data: {
          action: "Login to Distilled",
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
      dispatch(updateModalStatus(false))
    } catch (error) {
      console.error(error, "error")
    } finally {
      setLoadingConnectPhantom(false)
    }
  }

  return {
    loading:
      loadingConnectMetamask || loadingConnectOwallet || loadingConnectPhantom,
    loadingConnectMetamask,
    loadingConnectOwallet,
    loadingConnectPhantom,
    connectMetamaskWallet,
    connectMultipleWallet,
    connectPhantomWallet,
    connectOwallet,
  }
}

export default useConnectWallet
