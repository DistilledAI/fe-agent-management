import useAuthState from "@hooks/useAuthState"
import useConnectWallet from "@hooks/useConnectWallet"
import { Button, Input, Switch } from "@nextui-org/react"
import axios from "axios"
import bs58 from "bs58"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import ReactJson from "react-json-view"
import { toast } from "react-toastify"

// const API_URL = "http://15.235.226.9:7000"

const AddToken = ({ endpointAgent }: { endpointAgent: string }) => {
  const { loading, connectMultipleWallet } = useConnectWallet()
  const { isLogin, isAnonymous, user } = useAuthState()
  const isConnectWallet = isLogin && !isAnonymous
  const [role, setRole] = useState("sign_solana")
  const [addressAgent, setAddressAgent] = useState("")
  const [whitelistAgent, setWhiteListAgent] = useState()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [isWhitelist, setIsWhiteList] = useState(true)

  const getListAgents = async () => {
    const res = await axios.request({
      method: "get",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      url: `${endpointAgent}/wallet/signer/list`,
    })
    if (res.data) setWhiteListAgent(res.data)
  }

  useEffect(() => {
    if (endpointAgent) getListAgents()
    else setWhiteListAgent(undefined)
  }, [endpointAgent])

  const checkNetworkByAddress = (address: string) => {
    const isHex = /^(0x)?[0-9a-fA-F]+$/.test(address)
    if (isHex && address.startsWith("0x") && address.length === 42) {
      return "EVM"
    }

    const isBase58 = /^[A-HJ-NP-Za-km-z1-9]+$/.test(address)
    if (isBase58 && (address.length === 32 || address.length === 44)) {
      return "Solana"
    }

    return "Unknown"
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

  const handleAddWhitelistBySol = async () => {
    if (!endpointAgent) {
      toast.warning("Please enter endpoint!")
      return
    }
    const provider = getProvider()
    if (!provider || !addressAgent) return
    const timestamp = Math.floor(Date.now())
    await provider.request({ method: "connect" })

    const msgSignAddSol = {
      action: "set_whitelist",
      account: addressAgent,
      role,
      timestamp,
      is_whitelist: isWhitelist,
    }

    const message = JSON.stringify(msgSignAddSol)
    const encodedMessage = new TextEncoder().encode(message)
    const signedMessage = await provider.signMessage(encodedMessage, "utf8")
    const signature = bs58.encode(signedMessage.signature)

    const resAddrSol = await axios.request({
      method: "post",
      maxBodyLength: Infinity,
      url: `${endpointAgent}/wallet/owner/whitelist-signer`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        data: {
          account: msgSignAddSol.account,
          is_whitelist: msgSignAddSol.is_whitelist,
          timestamp: msgSignAddSol.timestamp,
          network: "solana",
          role: msgSignAddSol.role,
        },
        signature: signature,
      }),
    })

    if (resAddrSol.data) {
      toast.success("Updated whitelist successfully!")
      getListAgents()
    }
  }
  const handleAddWhitelistByEvm = async () => {
    if (!endpointAgent) {
      toast.warning("Please enter endpoint!")
      return
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    if (!provider || !addressAgent) return
    const timestamp = Math.floor(Date.now())
    const signer = await provider.getSigner()

    const msgSignAddEvm = {
      action: "set_whitelist",
      account: addressAgent,
      role,
      timestamp,
      is_whitelist: true,
    }
    const domain = {}
    const types = {
      Data: [
        { name: "action", type: "string" },
        { name: "account", type: "string" },
        { name: "role", type: "string" },
        { name: "timestamp", type: "uint256" },
        { name: "is_whitelist", type: "boolean" },
      ],
    }
    const value = {
      action: "set_whitelist",
      account: addressAgent,
      role: "sign_evm",
      timestamp,
      is_whitelist: isWhitelist,
    }
    const signature = (await signer._signTypedData(domain, types, value)) as any

    const resAddEvm = await axios.request({
      method: "post",
      maxBodyLength: Infinity,
      url: `${endpointAgent}/wallet/owner/whitelist-signer`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        data: {
          account: msgSignAddEvm.account,
          is_whitelist: msgSignAddEvm.is_whitelist,
          timestamp: msgSignAddEvm.timestamp,
          network: "evm",
          role: msgSignAddEvm.role,
        },
        signature: signature,
      }),
    })
    if (resAddEvm.data) {
      toast.success("Updated whitelist successfully!")
      getListAgents()
    }
  }

  const handleSubmit = () => {
    try {
      if (!isConnectWallet) return
      if (!addressAgent) {
        toast.warning("Please enter address")
        return
      }
      setSubmitLoading(true)
      if (checkNetworkByAddress(user.publicAddress) === "EVM") {
        handleAddWhitelistByEvm()
      } else handleAddWhitelistBySol()
    } catch (error) {
      console.error(error)
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <div className="mt-6">
      <div className="w-[400px] max-w-full rounded-md bg-mercury-70 p-5">
        <p className="mb-3 font-medium">Whitelist for your agent:</p>
        <Input
          classNames={{ inputWrapper: "border-1 rounded-md" }}
          onValueChange={setAddressAgent}
          placeholder="Enter public address"
        />
        <div className="mt-2 flex items-center gap-2">
          <p className="font-semibold">Is Whitelist:</p>
          <Switch isSelected={isWhitelist} onValueChange={setIsWhiteList} />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <p className="font-semibold">Role:</p>
          <div className="flex items-center">
            <select onChange={(e) => setRole(e.target.value)} value={role}>
              <option key="sign_solana">sign_solana</option>
              <option key="sign_evm">sign_evm</option>
              <option key="poly_market_call">poly_market_call</option>
            </select>
          </div>
        </div>
        {isConnectWallet ? (
          <Button
            isLoading={submitLoading}
            onClick={handleSubmit}
            className="mt-5 w-full rounded-md bg-mercury-200 font-medium"
          >
            SUBMIT
          </Button>
        ) : (
          <Button
            isLoading={loading}
            onClick={connectMultipleWallet}
            className="mt-5 w-full rounded-md bg-mercury-200 font-medium"
          >
            CONNECT WALLET
          </Button>
        )}
      </div>
      <div className="mt-10">
        <p className="mb-1 font-semibold">LIST WHITELIST:</p>
        {whitelistAgent ? (
          <ReactJson collapsed={true} src={whitelistAgent} />
        ) : (
          "No Items"
        )}
      </div>
    </div>
  )
}

export default AddToken
