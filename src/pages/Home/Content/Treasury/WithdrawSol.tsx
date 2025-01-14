import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes"
import useAuthState from "@hooks/useAuthState"
import useConnectWallet from "@hooks/useConnectWallet"
import { Button, Input } from "@nextui-org/react"
import { toBN } from "@utils/format"
import { useState } from "react"
import { toast } from "react-toastify"
import { connection, withdrawSol } from "./helpers"
import { PublicKey } from "@solana/web3.js"
import { fetchApiAuth } from "services/fetchApi"
import endpoint from "services/endpoint"
import { useAppSelector } from "@hooks/useAppRedux"

const WithdrawSol = ({ botInfo }: { botInfo: any }) => {
  const { loading, connectMultipleWallet } = useConnectWallet()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const { isLogin, isAnonymous, user } = useAuthState()
  const [txh, setTxh] = useState("")
  const [amountInput, setAmountInput] = useState("0")
  const [toAccount, setToAccount] = useState("")
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

  const handleWithdraw = async () => {
    try {
      if (!amountInput || !toAccount) {
        toast.warning("Please enter all info")
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

      const amount = toBN(
        toBN(amountInput || 0)
          .multipliedBy(10 ** 9)
          .toFixed(0, 1),
      ).toNumber()

      const transaction = await withdrawSol(
        botInfo.sol_address,
        amount,
        toAccount,
      )

      const TxSendToDistill = transaction?.serializeMessage()

      const msgDataTx = TxSendToDistill.toString("hex")

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

      console.log("resp", resp)

      transaction.addSignature(
        new PublicKey(botInfo.sol_address),
        Buffer.from(resp.data.signature),
      )
      const txid = await connection.sendRawTransaction(
        transaction.serialize(),
        {
          skipPreflight: true,
          maxRetries: 5,
        },
      )

      await connection.confirmTransaction(txid, "confirmed")

      setSubmitLoading(false)
      if (txid) {
        toast.success("Withdraw successfully!")
      }
      setTxh(txid)
      console.log(`txid--> ${txid}`)
    } catch (error) {
      console.error(error)
      setSubmitLoading(false)
    }
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 max-md:grid-cols-1">
      <div>
        <p className="text-18 font-semibold">Withdraw SOL</p>
        {txh && (
          <div className="mb-2 flex flex-col">
            <p className="text-14 font-semibold text-green-10">
              Withdraw successfully - Tx:
            </p>{" "}
            <p className="break-all text-15">{txh}</p>
          </div>
        )}
        <div className="mt-5 rounded-md bg-mercury-70 p-6">
          <div>
            <p className="mb-1 text-14 font-medium">AMOUNT</p>
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
            <p className="mb-1 text-14 font-medium">TO</p>
            <Input
              onValueChange={setToAccount}
              placeholder="Enter address"
              classNames={{
                inputWrapper: "border-1 rounded-md pr-1",
                input: "text-[16px] font-medium",
              }}
            />
          </div>
          {isConnectWallet ? (
            <Button
              onClick={handleWithdraw}
              isLoading={submitLoading}
              className="text-semibold mt-10 h-11 w-full rounded-md bg-mercury-200"
            >
              <span className="font-bold">WITHDRAW</span>
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

export default WithdrawSol
