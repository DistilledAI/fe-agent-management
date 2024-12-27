import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes"
import useAuthState from "@hooks/useAuthState"
import useConnectWallet from "@hooks/useConnectWallet"
import { Button, Input } from "@nextui-org/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const MigrateWalletByOwnerSol = ({
  endpointAgent,
}: {
  endpointAgent: string
}) => {
  const { loading, connectMultipleWallet } = useConnectWallet()
  const { isLogin, isAnonymous } = useAuthState()
  const [fromEndpoint, setFromEndpoint] = useState(endpointAgent)
  const [toEndpoint, setToEndpoint] = useState("")
  const [submitLoading, setSubmitLoading] = useState(false)
  const isConnectWallet = isLogin && !isAnonymous

  useEffect(() => {
    setFromEndpoint(endpointAgent)
  }, [endpointAgent])

  const getProvider = () => {
    if ("solana" in window) {
      const provider = (window as any).solana
      if (provider.isPhantom) {
        return provider
      }
    }

    return null
  }

  const handleSubmit = async () => {
    try {
      if (!fromEndpoint || !toEndpoint) {
        toast.warning("Please enter full info!")
        return
      }
      setSubmitLoading(true)
      const provider = getProvider()
      const timestamp = Math.floor(Date.now())
      await provider.request({ method: "connect" })

      const msgSign = {
        action: "snapshot",
        timestamp,
      }

      const message = JSON.stringify(msgSign)
      const encodedMessage = new TextEncoder().encode(message)
      const signedMessage = await provider.signMessage(encodedMessage, "utf8")
      const signature = bs58.encode(signedMessage.signature)

      const res = await axios.request({
        method: "post",
        maxBodyLength: Infinity,
        url: `${toEndpoint}/wallet/migrate`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          data: {
            fromCcHost: `${fromEndpoint}/wallet/snapshot-data`,
            timestamp,
            network: "solana",
          },
          signature,
        }),
      })

      if (res.data) {
        toast.success("Migrate successfully!")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 max-md:grid-cols-1">
      <div>
        <div className="mt-5 rounded-md bg-mercury-70 p-6">
          <div>
            <div className="flex items-center justify-between">
              <p className="mb-1 text-14 font-medium">FROM ENDPOINT</p>
            </div>
            <Input
              value={fromEndpoint}
              onValueChange={setFromEndpoint}
              placeholder="endpoint"
              classNames={{
                inputWrapper: "border-1 rounded-md pr-1",
                input: "text-[16px]",
              }}
            />
          </div>
          <div className="mt-4">
            <p className="mb-1 text-14 font-medium">TO ENDPOINT</p>
            <Input
              value={toEndpoint}
              onValueChange={setToEndpoint}
              placeholder="endpoint"
              classNames={{
                inputWrapper: "border-1 rounded-md pr-1",
                input: "text-[16px]",
              }}
            />
          </div>
          {isConnectWallet ? (
            <Button
              isLoading={submitLoading}
              onClick={handleSubmit}
              className="text-semibold mt-10 h-11 w-full rounded-md bg-mercury-200"
            >
              <span className="font-bold">Migrate</span>
            </Button>
          ) : (
            <Button
              onClick={connectMultipleWallet}
              isLoading={loading}
              className="text-semibold mt-10 h-11 w-full rounded-md bg-mercury-200"
            >
              <span className="font-bold">CONNECT WALLET</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MigrateWalletByOwnerSol
