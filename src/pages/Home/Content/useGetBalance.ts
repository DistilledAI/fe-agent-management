import { MAX_ADDRESS_SOLANA } from "program/constants"
import { Web3SolanaProgramInteraction } from "program/utils/web3Utils"
import { useEffect, useState } from "react"

const web3Solana = new Web3SolanaProgramInteraction()

const useGetBalance = (agentAddress: string) => {
  const [maxBalance, setMaxBalance] = useState(0)

  const getBalance = async (address: string) => {
    try {
      const tokenBal = await web3Solana.getTokenBalance(
        address,
        MAX_ADDRESS_SOLANA,
      )

      setMaxBalance(tokenBal ? tokenBal : 0)
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    if (agentAddress) getBalance(agentAddress)
  }, [agentAddress])

  return { getBalance, maxBalance }
}

export default useGetBalance
