import useAuthState from "@hooks/useAuthState"
import useConnectWallet from "@hooks/useConnectWallet"
import { Button, Input } from "@nextui-org/react"
import { useEffect, useState } from "react"
import useGetPrice from "./useGetPrice"
import useGetBalance from "../useGetBalance"
import { toBN } from "@utils/format"
import { swapTokenMaxToSol } from "./helpers"
import { toast } from "react-toastify"
import { Connection, PublicKey } from "@solana/web3.js"
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes"
import { SOLANA_RPC, SOLANA_WS } from "program/utils/web3Utils"
import { fetchApiAuth } from "services/fetchApi"
import endpoint from "services/endpoint"
import { useAppSelector } from "@hooks/useAppRedux"

const SwapToken = ({
  endpointAgent,
  botInfo,
}: {
  endpointAgent: string
  botInfo: any
}) => {
  const agentAddress = botInfo?.sol_address
  const { loading, connectMultipleWallet } = useConnectWallet()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const { isLogin, isAnonymous, user } = useAuthState()
  const [amountInput, setAmountInput] = useState("0")
  const [swapToValue, setSwapToValue] = useState("0")
  const [submitLoading, setSubmitLoading] = useState(false)
  const isConnectWallet = isLogin && !isAnonymous
  const { maxBalance, getBalance } = useGetBalance(agentAddress)
  const { maxPrice, solPrice } = useGetPrice()

  useEffect(() => {
    if (!amountInput || amountInput === "0") return setSwapToValue("0")
    const swapToNumber = toBN(
      toBN(amountInput).multipliedBy(maxPrice).div(solPrice),
    ).toFixed(6)
    setSwapToValue(swapToNumber)
  }, [amountInput])

  const getProvider = () => {
    if ("solana" in window) {
      const provider = (window as any).solana
      if (provider.isPhantom) {
        return provider
      }
    }

    return null
  }

  const handleSwap = async () => {
    try {
      if (!endpointAgent) {
        toast.warning("Please enter endpoint!")
        return
      }
      if (!amountInput) {
        toast.warning("Please enter amount!")
        return
      }
      setSubmitLoading(true)
      const provider = getProvider()
      if (!provider) return
      const timestamp = Math.floor(Date.now())
      await provider.request({ method: "connect" })

      const msgSign = {
        action: "sign_solana",
        timestamp,
      }

      const message = JSON.stringify(msgSign)
      const encodedMessage = new TextEncoder().encode(message)
      const signedMessage = await provider.signMessage(encodedMessage, "utf8")
      const signature = bs58.encode(signedMessage.signature)

      const transaction = await swapTokenMaxToSol(botInfo, amountInput)
      if (transaction) {
        const TxSendToDistill = transaction.message.serialize()
        const msgDataTx = Buffer.from(TxSendToDistill).toString("hex")

        const resp = await fetchApiAuth({
          method: "post",
          url: endpoint.CALL_AGENT,
          data: {
            botId: myAgent?.id,
            path: "/wallet/sign-solana",
            body: {
              data: {
                metadata: {
                  message: msgDataTx,
                },
                signer_addr: user.publicAddress,
                timestamp,
                network: "solana",
              },
              signature,
            },
          },
        })

        transaction.addSignature(
          new PublicKey(botInfo?.sol_address),
          Buffer.from(resp.data.signature),
        )
        const connection = new Connection(SOLANA_RPC, {
          commitment: "confirmed",
          wsEndpoint: SOLANA_WS,
        })

        const txid = await connection.sendRawTransaction(
          transaction.serialize(),
          {
            skipPreflight: true,
            maxRetries: 5,
          },
        )

        const latestBlockHash = await connection.getLatestBlockhash()
        console.log("latestBlock", { latestBlockHash })
        await connection.confirmTransaction({
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: txid,
        })

        console.log(`txid--> ${txid}`)
        setSubmitLoading(false)
        toast.success(`Locked successfully! tx: ${txid}`)
        if (agentAddress) getBalance(agentAddress)
      }
    } catch (error) {
      console.error(error)
      toast.error(error?.toString())
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
              <p className="mb-1 text-14 font-medium">AMOUNT (MAX)</p>
              <p>Balance: {maxBalance} MAX</p>
            </div>
            <Input
              onValueChange={setAmountInput}
              defaultValue="0"
              classNames={{
                inputWrapper: "border-1 rounded-md pr-1",
                input: "text-[16px] font-medium",
              }}
              type="number"
            />
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <p className="mb-1 text-14 font-medium">TO (SOL)</p>
              <p>
                1 MAX ≈{" "}
                {toBN(toBN(1).multipliedBy(maxPrice).div(solPrice)).toFixed(6)}{" "}
                SOL
              </p>
            </div>
            <Input
              isDisabled
              value={swapToValue}
              placeholder=""
              classNames={{
                inputWrapper: "border-1 rounded-md pr-1",
                input: "text-[16px] font-medium",
              }}
            />
          </div>
          {isConnectWallet ? (
            <Button
              onClick={handleSwap}
              isLoading={submitLoading}
              className="text-semibold mt-10 h-11 w-full rounded-md bg-mercury-200"
            >
              <span className="font-bold">{`SWAP MAX -> SOL`}</span>
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

export default SwapToken
