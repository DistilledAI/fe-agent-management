import { useEffect, useState } from "react"
import { getTreasuryAddr } from "./helpers"

const useFetchTreasury = (address: string) => {
  const [treasuryAddress, setTreasuryAddress] = useState("")

  const getTreasury = async () => {
    const addr = await getTreasuryAddr(address)
    if (addr) setTreasuryAddress(addr)
  }

  useEffect(() => {
    getTreasury()
  }, [])

  return { treasuryAddress, getTreasury }
}

export default useFetchTreasury
