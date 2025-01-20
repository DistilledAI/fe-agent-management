import { Connection, PublicKey } from "@solana/web3.js"
import idl from "./treasury.json"
import { SolanaTreasuryProgram } from "./treasury"
import { SOLANA_RPC } from "program/utils/web3Utils"
import { BN, Program, web3 } from "@coral-xyz/anchor"

const TREASURY = "treasury"

const programInterface = idl as SolanaTreasuryProgram

export const connection = new Connection(SOLANA_RPC, {
  commitment: "confirmed",
})

const program = new Program(programInterface, {
  connection,
}) as Program<SolanaTreasuryProgram>

export const getTreasuryAddr = async (address: string) => {
  const [treasury] = PublicKey.findProgramAddressSync(
    [Buffer.from(TREASURY), new PublicKey(address).toBytes()],
    program.programId,
  )
  console.log("Treasury: ", treasury.toBase58())

  return treasury.toBase58()
}

export const createTreasury = async (address: string) => {
  const agentAddress = new PublicKey(address)

  const setComputePriceLimit = web3.ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 100_000,
  })
  const setComputeUnitLimit = web3.ComputeBudgetProgram.setComputeUnitLimit({
    units: 300_000,
  })

  const txInstructions = await program.methods
    .initialize()
    .accounts({ signer: agentAddress })
    .instruction()

  const tx = new web3.Transaction()
    .add(setComputePriceLimit)
    .add(setComputeUnitLimit)
    .add(txInstructions)
  tx.feePayer = agentAddress
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

  return tx
}

export const withdrawSol = async (
  walletAddress: string,
  amount: number,
  receiver: string,
) => {
  const agentAddress = new PublicKey(walletAddress)

  const setComputePriceLimit = web3.ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 10_000_000,
  })
  const setComputeUnitLimit = web3.ComputeBudgetProgram.setComputeUnitLimit({
    units: 300_000,
  })

  const txInstructions = await program.methods
    .withdrawSol(new BN(amount))
    .accounts({
      signer: agentAddress,
      receiver,
    })
    .instruction()

  const tx = new web3.Transaction()
    .add(setComputePriceLimit)
    .add(setComputeUnitLimit)
    .add(txInstructions)
  tx.feePayer = agentAddress
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

  return tx
}

export const withdrawToken = async (
  walletAddress: string,
  tokenStr: string,
  amount: number,
  receiverStr: string,
) => {
  const agentAddress = new PublicKey(walletAddress)

  const token = new PublicKey(tokenStr)
  const receiver = new PublicKey(receiverStr)
  console.log(`amount`, amount)
  const setComputePriceLimit = web3.ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 10_000_000,
  })
  const setComputeUnitLimit = web3.ComputeBudgetProgram.setComputeUnitLimit({
    units: 300_000,
  })

  const txInstructions = await program.methods
    .withdrawToken(new BN(amount))
    .accounts({
      signer: agentAddress,
      receiver,
      currencyMint: token,
    })
    .instruction()

  const tx = new web3.Transaction()
    .add(setComputePriceLimit)
    .add(setComputeUnitLimit)
    .add(txInstructions)
  tx.feePayer = agentAddress
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

  return tx
}
