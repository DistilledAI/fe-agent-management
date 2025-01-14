import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes"
import useAuthState from "@hooks/useAuthState"
import useConnectWallet from "@hooks/useConnectWallet"
import { Button, Input } from "@nextui-org/react"
import { Connection, PublicKey } from "@solana/web3.js"
import { SOLANA_RPC, SOLANA_WS } from "program/utils/web3Utils"
import { useState } from "react"
import { toast } from "react-toastify"
import { swapToken } from "./helpers"
import { fetchApiAuth } from "services/fetchApi"
import endpoint from "services/endpoint"
import { useAppSelector } from "@hooks/useAppRedux"

const SwapOtherToken = ({ botInfo }: { botInfo: any }) => {
  const { loading, connectMultipleWallet } = useConnectWallet()
  const { isLogin, isAnonymous, user } = useAuthState()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const [decimal, setDecimal] = useState("6")
  const [txh, setTxh] = useState("")
  const isConnectWallet = isLogin && !isAnonymous
  const [amountInput, setAmountInput] = useState("0")
  const [assetIn, setAssetIn] = useState("")
  const [assetOut, setAssetOut] = useState("")
  const [slippageBps, setSlippageBps] = useState("1.5")
  const [submitLoading, setSubmitLoading] = useState(false)

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
      if (amountInput === "0") {
        toast.warning("Please enter amount!")
        return
      }
      if (!amountInput || !decimal || !assetIn || !assetOut) {
        toast.warning("Please enter full info!")
        return
      }
      setTxh("")
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

      const transaction = await swapToken({
        botInfo,
        assetIn,
        assetOut,
        decimal: Number(decimal),
        amount: amountInput,
        slippageBps: Number(slippageBps) * 100,
      })
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
        console.log("latestBlock", latestBlockHash)
        await connection.confirmTransaction({
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: txid,
        })

        console.log(`txid--> ${txid}`)
        setTxh(txid)
        setSubmitLoading(false)
        toast.success(`Locked successfully! tx: ${txid}`)
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
        {txh && (
          <div className="mb-2 flex flex-col">
            <p className="text-14 font-semibold text-green-10">
              Swap successfully - Tx:
            </p>{" "}
            <p className="break-all text-15">{txh}</p>
          </div>
        )}
        <div className="mt-5 rounded-md bg-mercury-70 p-6">
          <div>
            <div className="flex items-center justify-between">
              <p className="mb-1 text-14 font-medium">ASSET (A TOKEN)</p>
            </div>
            <Input
              placeholder="Enter address"
              onValueChange={setAssetIn}
              classNames={{
                inputWrapper: "border-1 rounded-md pr-1",
                input: "text-[16px]",
              }}
            />
          </div>
          <div className="mt-4">
            <p className="mb-1 text-14 font-medium">DECIMAL (A TOKEN)</p>
            <Input
              onValueChange={setDecimal}
              defaultValue="6"
              value={decimal}
              classNames={{
                inputWrapper: "border-1 rounded-md pr-1",
                input: "text-[16px] font-medium",
              }}
              type="number"
            />
          </div>
          <div className="mt-4">
            <p className="mb-1 text-14 font-medium">AMOUNT (A TOKEN)</p>
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
            <p className="mb-1 text-14 font-medium">ASSET (B TOKEN)</p>
            <Input
              placeholder="Enter address"
              onValueChange={setAssetOut}
              classNames={{
                inputWrapper: "border-1 rounded-md pr-1",
                input: "text-[16px]",
              }}
            />
          </div>
          <div className="mt-4">
            <p className="mb-1 text-14 font-medium">SLIPPAGE (%)</p>
            <Input
              onValueChange={(value) => {
                if (Number(value) > 10 || value.length > 4) return
                setSlippageBps(value)
              }}
              value={slippageBps}
              defaultValue="1.5"
              classNames={{
                inputWrapper: "border-1 rounded-md pr-1",
                input: "text-[16px] font-medium",
              }}
              type="number"
            />
          </div>
          {isConnectWallet ? (
            <Button
              isLoading={submitLoading}
              onClick={handleSwap}
              className="text-semibold mt-10 h-11 w-full rounded-md bg-mercury-200"
            >
              <span className="font-bold">SWAP A to B</span>
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

export default SwapOtherToken
