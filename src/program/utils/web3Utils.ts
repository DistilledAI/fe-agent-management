import { WalletContextState } from "@solana/wallet-adapter-react"
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionExpiredTimeoutError,
} from "@solana/web3.js"
import * as anchor from "@coral-xyz/anchor"
import BigNumber from "bignumber.js"
import { SoloraPythPrice } from "../types/solora_pyth_price.ts"
import idl from "../idl/solora_pyth_price.json"

export const commitmentLevel = "confirmed"
export const TOKEN_RESERVES = 1_000_000_000_000_000
export const LAMPORT_RESERVES = 1_000_000_000
export const INIT_BONDING_CURVE = 95

const SOLANA_RPC =
  "https://convincing-practical-moon.solana-devnet.quiknode.pro/5b018a6d154e06d1c892246cf1b5a251b40bddc1"
const SOLANA_WS =
  "wss://convincing-practical-moon.solana-devnet.quiknode.pro/5b018a6d154e06d1c892246cf1b5a251b40bddc1"

export const endpoint = SOLANA_RPC
export const pumpProgramId = new PublicKey(idl.address)
export const pumpProgramInterface = JSON.parse(JSON.stringify(idl))

export class Web3SolanaProgramInteraction {
  constructor(
    private readonly connection = new Connection(endpoint, {
      commitment: commitmentLevel,
      wsEndpoint: SOLANA_WS,
    }),
  ) {}

  // Swap transaction
  simulateSwapTx = async (
    mint: PublicKey,
    wallet: WalletContextState,
    amount: string,
    type: number,
  ): Promise<string> => {
    console.log("========Simulate swap==============")

    // check the connection
    if (!wallet.publicKey || !this.connection) {
      console.log("Warning: Wallet not connected")
      return ""
    }
    const provider = new anchor.AnchorProvider(this.connection, wallet as any, {
      preflightCommitment: "confirmed",
    })
    anchor.setProvider(provider)
    const program = new anchor.Program(
      pumpProgramInterface,
      provider,
    ) as anchor.Program<SoloraPythPrice>

    try {
      const tx = await program.methods
        .simulateSwap(new anchor.BN(amount), type)
        .accounts({
          tokenMint: mint,
        })
        .view()

      const actualAmountOut = new anchor.BN(tx).toString()
      return actualAmountOut
    } catch (error: any) {
      console.log("Error in swap transaction", error, error.error)
      return ""
    }
  }

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
