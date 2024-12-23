import useAuthState from "@hooks/useAuthState"
import useConnectWallet from "@hooks/useConnectWallet"
import { Button, Input } from "@nextui-org/react"
// import { useEffect, useState } from "react"
// import { LOCK_TIME_OPTIONS } from "../constants"
// import { twMerge } from "tailwind-merge"
// import { useWallet } from "@solana/wallet-adapter-react"
// import { Web3SolanaProgramInteraction } from "program/utils/web3Utils"
import { endpoint } from "program/web3Locking"
// import { ALL_CONFIGS } from "program/config"
import axios from "axios"
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes"
import { Connection, PublicKey, Transaction } from "@solana/web3.js"
import {
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token"
import { useState } from "react"
import { toBN } from "@utils/format"
import { toast } from "react-toastify"

// const web3Solana = new Web3SolanaProgramInteraction()
// const web3Locking = new Web3SolanaLockingToken()

// const endpointAgent = "http://15.235.226.9:7000"

const WithdrawOtherToken = ({ endpointAgent }: { endpointAgent: string }) => {
  const { loading, connectMultipleWallet } = useConnectWallet()
  const { isLogin, isAnonymous, user } = useAuthState()
  const [amountInput, setAmountInput] = useState("0")
  const [toAccount, setToAccount] = useState("")
  const [assetAddress, setAssetAddress] = useState("")
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

  const getInfoBot = async (endPointBot: string) => {
    const res = await axios.request({
      method: "get",
      maxBodyLength: Infinity,
      url: `${endPointBot}/private_agent/info`,
      headers: {},
    })
    return res.data
  }

  const handleWithdraw = async (endpointAgent: string) => {
    if (!amountInput || !toAccount || !assetAddress) {
      toast.warning("Please enter all info")
      return
    }
    const botInfo = await getInfoBot(endpointAgent)
    const provider = getProvider()
    if (!provider) return
    const timestamp = Math.floor(Date.now())
    await provider.request({ method: "connect" })

    const token = new PublicKey(assetAddress)

    const senderTokenAccount = await getAssociatedTokenAddress(
      token,
      new PublicKey(botInfo.sol_address),
    )

    const receiverTokenAccount = await getAssociatedTokenAddress(
      token,
      new PublicKey(toAccount),
    )

    const msgSign = {
      action: "sign_solana",
      timestamp: timestamp,
    }

    const message = JSON.stringify(msgSign)
    const encodedMessage = new TextEncoder().encode(message)
    const signedMessage = await provider.signMessage(encodedMessage, "utf8")
    const signature = bs58.encode(signedMessage.signature)

    const amount = toBN(
      toBN(amountInput || 0)
        .multipliedBy(10 ** 6)
        .toFixed(0, 1),
    ).toNumber()
    const transaction = new Transaction().add(
      createTransferCheckedInstruction(
        senderTokenAccount, // Source token account
        token, // Mint address of the token
        receiverTokenAccount, // Destination token account
        new PublicKey(botInfo.sol_address),
        amount, // Amount of USDC to transfer (1 USDC = 1e6 for 6 decimals)
        6, // Decimals (USDC has 6 decimals on Solana)
      ),
    )

    const connection = new Connection(endpoint, {
      commitment: "confirmed",
      wsEndpoint: "wss://solana-rpc.publicnode.com",
    })

    const { blockhash } = await connection.getLatestBlockhash()

    transaction.recentBlockhash = blockhash
    transaction.feePayer = new PublicKey(botInfo.sol_address)
    const TxSendToDistill = transaction?.serializeMessage()

    const msgDataTx = TxSendToDistill.toString("hex")

    const resp = await axios.request({
      method: "post",
      maxBodyLength: Infinity,
      url: `${endpointAgent}/wallet/sign-solana`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        data: {
          metadata: {
            message: msgDataTx,
          },
          signer_addr: user.publicAddress,
          timestamp,
          network: "solana",
        },
        signature,
      }),
    })

    console.log("resp", resp)

    transaction.addSignature(
      new PublicKey(botInfo.sol_address),
      Buffer.from(resp.data.signature),
    )
    const txid = await connection.sendRawTransaction(transaction.serialize(), {
      skipPreflight: true,
      maxRetries: 5,
    })

    await connection.confirmTransaction(txid, "confirmed")

    console.log(`txid--> ${txid}`)
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      <div>
        <p className="text-18 font-semibold">Withdraw Other Token</p>
        <div className="mt-5 rounded-md bg-mercury-70 p-6">
          <div>
            <p className="mb-1 text-14 font-medium">AMOUNT</p>
            <Input
              defaultValue="0"
              onValueChange={setAmountInput}
              classNames={{
                inputWrapper: "border-1 rounded-md pr-1",
                input: "text-[16px] font-medium",
              }}
              type="number"
            />
          </div>
          <div className="mt-4">
            <p className="mb-1 text-14 font-medium">ASSET</p>
            <Input
              placeholder="Enter address"
              onValueChange={setAssetAddress}
              classNames={{
                inputWrapper: "border-1 rounded-md pr-1",
                input: "text-[16px] font-medium",
              }}
            />
          </div>
          <div className="mt-4">
            <p className="mb-1 text-14 font-medium">TO</p>
            <Input
              placeholder="Enter address"
              onValueChange={setToAccount}
              classNames={{
                inputWrapper: "border-1 rounded-md pr-1",
                input: "text-[16px] font-medium",
              }}
            />
          </div>
          {isConnectWallet ? (
            <Button
              onClick={() => handleWithdraw(endpointAgent)}
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

export default WithdrawOtherToken
