import useAuthState from "@hooks/useAuthState"
import useConnectWallet from "@hooks/useConnectWallet"
import { Button, Input } from "@nextui-org/react"
import { useState } from "react"
import { LOCK_TIME_OPTIONS } from "../constants"
import { twMerge } from "tailwind-merge"
import { Web3SolanaLockingToken } from "program/web3Locking"
import { ALL_CONFIGS, SPL_DECIMAL } from "program/config"
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes"
import { Connection, PublicKey } from "@solana/web3.js"
import { toBN } from "@utils/format"
import { toast } from "react-toastify"
import { SOLANA_RPC, SOLANA_WS } from "program/utils/web3Utils"
import useGetBalance from "../useGetBalance"
import { fetchApiAuth } from "services/fetchApi"
import endpoint from "services/endpoint"
import { useAppSelector } from "@hooks/useAppRedux"

const web3Locking = new Web3SolanaLockingToken()

const LockToken = ({ agentAddress }: { agentAddress: string }) => {
  const { loading, connectMultipleWallet } = useConnectWallet()
  const { isLogin, isAnonymous, user } = useAuthState()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const isConnectWallet = isLogin && !isAnonymous
  const [selectedLockTime, setSelectedLockTime] = useState(LOCK_TIME_OPTIONS[0])
  const [stakeAmount, setStakeAmount] = useState<string>("")
  const [txh, setTxh] = useState("")
  const [submitLoading, setSubmitLoading] = useState(false)
  const { maxBalance: tokenBal, getBalance } = useGetBalance(agentAddress)

  const getProvider = () => {
    if ("solana" in window) {
      const provider = (window as any).solana
      if (provider.isPhantom) {
        return provider
      }
    }

    return null
  }

  // const wallet = useWallet()
  // const getBalance = async () => {
  //   if (!wallet.publicKey) {
  //     return setTokenBal(0)
  //   }

  //   try {
  //     const [tokenBal] = await Promise.all([
  //       web3Solana.getTokenBalance(
  //         wallet.publicKey.toString(),
  //         ALL_CONFIGS.STAKE_CURRENCY_MINT,
  //       ),
  //       // web3Solana.getSolanaBalance(wallet.publicKey),
  //     ])
  //     setTokenBal(tokenBal ? tokenBal : 0)
  //     // setSolBalance(solBal ? solBal : 0);
  //   } catch (error) {
  //     console.log("error", error)
  //   }
  // }

  // useEffect(() => {
  //   getBalance()
  // }, [wallet.publicKey])

  // const AMOUNT_LIST = [
  //   {
  //     label: "25%",
  //     value: tokenBal / 4,
  //   },
  //   {
  //     label: "50%",
  //     value: tokenBal / 2,
  //   },
  //   {
  //     label: "75%",
  //     value: (tokenBal / 4) * 3,
  //   },
  //   {
  //     label: "100%",
  //     value: tokenBal,
  //   },
  // ]

  const getInfoBot = async () => {
    const res = await fetchApiAuth({
      method: "post",
      url: endpoint.CALL_AGENT,
      data: {
        botId: myAgent?.id,
        path: "/private_agent/info",
      },
    })
    return res.data
  }

  const handleLockTokenBySol = async () => {
    try {
      if (!stakeAmount) {
        toast.warning("Please enter amount!")
        return
      }
      setTxh("")
      setSubmitLoading(true)
      const botInfo = await getInfoBot()
      const provider = getProvider()
      if (!provider) return
      const timestamp = Math.floor(Date.now())
      await provider.request({ method: "connect" })

      const msgSign = {
        action: "sign_solana",
        timestamp: timestamp,
      }

      const message = JSON.stringify(msgSign)
      const encodedMessage = new TextEncoder().encode(message)
      const signedMessage = await provider.signMessage(encodedMessage, "utf8")
      const signature = bs58.encode(signedMessage.signature)

      const duration =
        selectedLockTime.value * ALL_CONFIGS.TIMER.MONTH_TO_SECONDS
      const amount = toBN(
        toBN(stakeAmount || 0)
          .multipliedBy(10 ** SPL_DECIMAL)
          .toFixed(0, 1),
      ).toNumber()

      const transaction: any = await web3Locking.stakeV2(
        duration,
        amount,
        botInfo,
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

      transaction.addSignature(
        new PublicKey(botInfo.sol_address),
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

      await connection.confirmTransaction(txid, "confirmed")
      console.log(`txid--> ${txid}`)
      setSubmitLoading(false)
      setTxh(txid)
      toast.success(`Locked successfully! tx: ${txid}`)
      if (agentAddress) getBalance(agentAddress)
    } catch (error) {
      console.error(error)
      toast.error(error?.toString())
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 max-md:grid-cols-1">
      {/* <div className="">
        <p className="text-18 font-semibold">Your locked</p>
        <div className="mt-5">
          <div className="flex min-h-[200px] flex-col items-center justify-center rounded-md bg-mercury-70 p-6">
            <p className="font-medium">NO LOCKED</p>
            <p className="text-mercury-500">
              Your locked history will appear here
            </p>
          </div>
        </div>
      </div> */}
      <div>
        {txh && (
          <div className="mb-2 flex flex-col">
            <p className="text-14 font-semibold text-green-10">
              Locked successfully - Tx:
            </p>{" "}
            <p className="break-all text-15">{txh}</p>
          </div>
        )}
        <p className="text-18 font-semibold">Let's lock now</p>
        <div className="mt-5 rounded-md bg-mercury-70 p-6">
          <div>
            <p className="mb-3 text-14 font-medium">LOCK AMOUNT</p>
            <Input
              defaultValue="0"
              onValueChange={setStakeAmount}
              classNames={{
                inputWrapper: "border-1 rounded-md pr-1",
                input: "text-[16px] font-medium",
              }}
              type="number"
              endContent={
                <div className="flex items-center justify-center gap-2 rounded-md bg-mercury-200 px-3 py-1">
                  <p className="text-14 font-medium">MAX</p>
                  <img
                    className="h-5 w-5 rounded-full object-cover"
                    src="https://agents.land/assets/richoldman-B161lZj3.png"
                    alt="avatar"
                  />
                </div>
              }
            />
            {agentAddress && (
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-14"></div>
                <div>
                  <p className="text-14 font-medium">Balance: {tokenBal} MAX</p>
                </div>
              </div>
            )}
          </div>
          <div className="mt-5">
            <p className="mb-3 text-14 font-medium">LOCKING DURATION</p>
            <div className="grid grid-cols-3 gap-4">
              {LOCK_TIME_OPTIONS.map((item) => (
                <div
                  key={item.value}
                  className={twMerge(
                    "px cursor-pointer rounded-md border-1 bg-mercury-100 py-2 text-center",
                    selectedLockTime.label === item.label &&
                      "border-mercury-900",
                  )}
                  onClick={() => setSelectedLockTime(item)}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
          {isConnectWallet ? (
            <Button
              isLoading={submitLoading}
              onClick={handleLockTokenBySol}
              className="text-semibold mt-10 h-11 w-full rounded-md bg-mercury-200"
            >
              <span className="font-bold">LOCK</span>
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

export default LockToken
