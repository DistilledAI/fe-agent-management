import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes"
import { useAppSelector } from "@hooks/useAppRedux"
import useAuthState from "@hooks/useAuthState"
import useConnectWallet from "@hooks/useConnectWallet"
import { Button, Input } from "@nextui-org/react"
import { useState } from "react"
import { toast } from "react-toastify"
import endpoint from "services/endpoint"
import { fetchApiAuth } from "services/fetchApi"

const MigrateWalletByOwnerSol = () => {
  const { loading, connectMultipleWallet } = useConnectWallet()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const { isLogin, isAnonymous } = useAuthState()
  const [toEndpoint, setToEndpoint] = useState("")
  const [submitLoading, setSubmitLoading] = useState(false)
  const isConnectWallet = isLogin && !isAnonymous

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
      if (!toEndpoint) {
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

      const res = await fetchApiAuth({
        method: "post",
        url: endpoint.CALL_AGENT,
        data: {
          botId: myAgent?.id,
          path: "/wallet/sign-solana",
          body: {
            data: {
              fromCcHost: `/wallet/snapshot-data`,
              timestamp,
              network: "solana",
            },
            signature,
          },
        },
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
