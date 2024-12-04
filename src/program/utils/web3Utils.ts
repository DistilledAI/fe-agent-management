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
import { EVENT, EVENT_CONFIG, PUBKEYS } from "program/constants.ts"
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes/index"
import { BN } from "@coral-xyz/anchor"

export const commitmentLevel = "confirmed"
export const TOKEN_RESERVES = 1_000_000_000_000_000
export const LAMPORT_RESERVES = 1_000_000_000
export const INIT_BONDING_CURVE = 95

// const SOLANA_RPC =
//   "https://convincing-practical-moon.solana-devnet.quiknode.pro/5b018a6d154e06d1c892246cf1b5a251b40bddc1"
// const SOLANA_WS =
//   "wss://convincing-practical-moon.solana-devnet.quiknode.pro/5b018a6d154e06d1c892246cf1b5a251b40bddc1"

const SOLANA_RPC =
  "https://alien-stylish-road.solana-mainnet.quiknode.pro/4a5144638133c97e486d36e03fa4a82ea99c9add"
const SOLANA_WS =
  "wss://alien-stylish-road.solana-mainnet.quiknode.pro/4a5144638133c97e486d36e03fa4a82ea99c9add"

export const endpoint = SOLANA_RPC
export const pythProgramId = new PublicKey(idl.address)
export const pythProgramInterface = JSON.parse(JSON.stringify(idl))

export class Web3SolanaProgramInteraction {
  constructor(
    private readonly connection = new Connection(endpoint, {
      commitment: commitmentLevel,
      wsEndpoint: SOLANA_WS,
    }),
  ) {}

  getEventConfig = async (wallet: WalletContextState) => {
    // check the connection
    if (!wallet.publicKey || !this.connection) {
      console.log("Warning: Wallet not connected")
      return { eventDataConfig: "", eventConfigPda: "" }
    }
    const provider = new anchor.AnchorProvider(this.connection, wallet as any, {
      preflightCommitment: "confirmed",
    })
    anchor.setProvider(provider)
    const program = new anchor.Program(
      pythProgramInterface,
      provider,
    ) as anchor.Program<SoloraPythPrice>

    const [eventConfigPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from(EVENT_CONFIG),
        new PublicKey(PUBKEYS.MAINNET.EVENT_AUTHORITY).toBytes(),
        new PublicKey(PUBKEYS.MAINNET.PYTH_FEED).toBytes(),
        new PublicKey(PUBKEYS.MAINNET.CURRENCY_MINT).toBytes(),
      ],
      program.programId,
    )

    const eventDataConfig =
      await program.account.eventConfig.fetch(eventConfigPda)

    return { eventDataConfig, eventConfigPda }
  }

  getEventData = async (
    wallet: WalletContextState,
    eventConfigPda: PublicKey,
    currentRound: number,
  ) => {
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
      pythProgramInterface,
      provider,
    ) as anchor.Program<SoloraPythPrice>

    const [event] = PublicKey.findProgramAddressSync(
      [
        Buffer.from(EVENT),
        eventConfigPda.toBytes(),
        Buffer.from(new BN(currentRound).toArray("le", 8)),
      ],
      program.programId,
    )

    const eventData = await program.account.event.fetch(event)

    return eventData
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
