import { PublicKey, VersionedTransaction } from "@solana/web3.js"
import { toBN } from "@utils/format"
import axios from "axios"
import BigNumber from "bignumber.js"
import { createJupiterApiClient } from "@jup-ag/api"

const jupiterQuoteApi = createJupiterApiClient()

export const swapTokenMaxToSol = async (botInfo: any, amount: string) => {
  const agentAddress = new PublicKey(botInfo.sol_address)

  const totalMaxNeed = toBN(toBN(amount).toNumber() * 1e6)
    .integerValue(BigNumber.ROUND_HALF_UP)
    .toNumber()
  console.log(`totalMaxNeed`, totalMaxNeed)

  const quoteRes = await axios.request({
    method: "get",
    url: `https://quote-api.jup.ag/v6/quote?inputMint=oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h&outputMint=So11111111111111111111111111111111111111112&amount=${totalMaxNeed}&slippageBps=200`,
  })
  const quoteResponse = quoteRes.data
  const { swapTransaction } = await (
    await fetch("https://quote-api.jup.ag/v6/swap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // quoteResponse from /quote api
        quoteResponse,
        // user public key to be used for the swap
        userPublicKey: botInfo.sol_address,
        // auto wrap and unwrap SOL. default is true
        wrapAndUnwrapSol: true,
        // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
        // feeAccount: "fee_account_public_key"
      }),
    })
  ).json()

  const swapTransactionBuf = Buffer.from(swapTransaction, "base64")
  const transaction: any = VersionedTransaction.deserialize(swapTransactionBuf)

  transaction.feePayer = agentAddress

  return transaction
}

export const swapToken = async ({
  botInfo,
  amount,
  assetIn,
  assetOut,
  decimal,
  slippageBps,
}: {
  botInfo: any
  amount: string
  assetIn: string
  assetOut: string
  decimal: number
  slippageBps: number
}) => {
  const agentAddress = new PublicKey(botInfo.sol_address)

  const totalAmount = toBN(toBN(amount).toNumber() * 10 ** decimal)
    .integerValue(BigNumber.ROUND_HALF_UP)
    .toNumber()
  console.log("amount", totalAmount)

  const quoteRes = await axios.request({
    method: "get",
    url: `https://quote-api.jup.ag/v6/quote?inputMint=${assetIn}&outputMint=${assetOut}&amount=${totalAmount}&slippageBps=200`,
  })
  const quoteResponse = quoteRes.data
  const { swapTransaction } = await (
    await fetch("https://quote-api.jup.ag/v6/swap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // quoteResponse from /quote api
        quoteResponse,
        // user public key to be used for the swap
        userPublicKey: botInfo.sol_address,
        // auto wrap and unwrap SOL. default is true
        wrapAndUnwrapSol: true,
        // prioritizationFeeLamports: 100000,
        computeUnitPriceMicroLamports: 100000,
        dynamicComputeUnitLimit: true,
        slippageBps,
        // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
        // feeAccount: "fee_account_public_key"
      }),
    })
  ).json()

  const swapTransactionBuf = Buffer.from(swapTransaction, "base64")
  const transaction: any = VersionedTransaction.deserialize(swapTransactionBuf)

  transaction.feePayer = agentAddress

  return transaction
}

export const swapV2 = async ({
  botInfo,
  amount,
  assetIn,
  assetOut,
  decimal,
}: {
  botInfo: any
  amount: string
  assetIn: string
  assetOut: string
  decimal: number
}) => {
  const agentAddress = new PublicKey(botInfo.sol_address)

  const totalAmount = toBN(toBN(amount).toNumber() * 10 ** decimal)
    .integerValue(BigNumber.ROUND_HALF_UP)
    .toNumber()
  console.log("amount", totalAmount)

  const routes = await jupiterQuoteApi.quoteGet({
    outputMint: assetOut,
    inputMint: assetIn,
    amount: totalAmount,
    autoSlippage: true,
    slippageBps: 150,
    autoSlippageCollisionUsdValue: 1_000,
    maxAutoSlippageBps: 1000,
    minimizeSlippage: true,
    onlyDirectRoutes: false,
    asLegacyTransaction: false,
  })

  const swapTx = await jupiterQuoteApi.swapPost({
    swapRequest: {
      quoteResponse: routes,
      userPublicKey: botInfo.sol_address,
      wrapAndUnwrapSol: true,
      dynamicComputeUnitLimit: true,
      prioritizationFeeLamports: "auto",
    },
  })

  // const quoteRes = await axios.request({
  //   method: "get",
  //   url: `https://quote-api.jup.ag/v6/quote?inputMint=oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h&outputMint=So11111111111111111111111111111111111111112&amount=${totalMaxNeed}&slippageBps=200`,
  // })
  // const quoteResponse = quoteRes.data
  // const { swapTransaction } = await (
  //   await fetch("https://quote-api.jup.ag/v6/swap", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       // quoteResponse from /quote api
  //       quoteResponse,
  //       // user public key to be used for the swap
  //       userPublicKey: botInfo.sol_address,
  //       // auto wrap and unwrap SOL. default is true
  //       wrapAndUnwrapSol: true,
  //       // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
  //       // feeAccount: "fee_account_public_key"
  //     }),
  //   })
  // ).json()

  const transaction: any = VersionedTransaction.deserialize(
    Buffer.from(swapTx.swapTransaction, "base64"),
  )

  // const swapTransactionBuf = Buffer.from(swapTransaction, "base64")
  // const transaction: any = VersionedTransaction.deserialize(swapTransactionBuf)

  transaction.feePayer = agentAddress

  return transaction
}
