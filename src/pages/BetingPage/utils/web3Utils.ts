import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionExpiredTimeoutError,
} from "@solana/web3.js"
//   import * as anchor from "@coral-xyz/anchor";
//   import { WalletContextState } from "@solana/wallet-adapter-react";
import BigNumber from "bignumber.js"

export const commitmentLevel = "confirmed"
export const TOKEN_RESERVES = 1_000_000_000_000_000
export const LAMPORT_RESERVES = 1_000_000_000
export const INIT_BONDING_CURVE = 95

const SOLANA_RPC =
  "https://convincing-practical-moon.solana-devnet.quiknode.pro/5b018a6d154e06d1c892246cf1b5a251b40bddc1"
const SOLANA_WS =
  "wss://convincing-practical-moon.solana-devnet.quiknode.pro/5b018a6d154e06d1c892246cf1b5a251b40bddc1"

export const endpoint = SOLANA_RPC
//   export const pumpProgramId = new PublicKey(idl.address);
//   export const pumpProgramInterface = JSON.parse(JSON.stringify(idl));

export class Web3SolanaProgramInteraction {
  constructor(
    private readonly connection = new Connection(endpoint, {
      commitment: commitmentLevel,
      wsEndpoint: SOLANA_WS,
    }),
  ) {}

  getTokenBalance = async (walletAddress: string, tokenMintAddress: string) => {
    const wallet = new PublicKey(walletAddress)
    const tokenMint = new PublicKey(tokenMintAddress)

    // Fetch the token account details
    const response = await this.connection.getTokenAccountsByOwner(wallet, {
      mint: tokenMint,
    })

    if (response.value.length == 0) {
      console.log("No token account found for the specified mint address.")
      return
    }

    // Get the balance
    const tokenAccountInfo = await this.connection.getTokenAccountBalance(
      response.value[0].pubkey,
    )

    console.log(`Token Balance: ${tokenAccountInfo.value.uiAmount}`)

    return tokenAccountInfo.value.uiAmount
  }

  getSolanaBalance = async (publicKey: PublicKey) => {
    const balance = await this.connection.getBalance(publicKey)
    const balanceSolana = new BigNumber(balance)
      .dividedBy(LAMPORTS_PER_SOL)
      .toNumber()

    return balanceSolana
  }

  isTransactionExpiredTimeoutError(error: any) {
    return error instanceof TransactionExpiredTimeoutError
  }

  handleTransaction = async ({
    error,
  }: {
    error: TransactionExpiredTimeoutError
  }) => {
    try {
      if (this.isTransactionExpiredTimeoutError(error) || error["signature"]) {
        const result = await this.connection.getSignatureStatus(
          error.signature,
          {
            searchTransactionHistory: true,
          },
        )

        if (result?.value?.confirmationStatus) {
          console.log(result)

          return { transaction: error.signature, result }
        }
      }

      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
