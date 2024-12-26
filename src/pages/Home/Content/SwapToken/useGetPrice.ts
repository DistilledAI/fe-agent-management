import axios from "axios"
import { useEffect, useState } from "react"

const useGetPrice = () => {
  const [solPrice, setSolPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)

  const getSolPrice = async () => {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
    )
    if (response.data) setSolPrice(response.data.solana?.usd || 0)
  }

  const fetchPriceByContractAddress = async (contractAddress: string) => {
    const url = `https://api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=${contractAddress}&vs_currencies=usd`
    const response = await axios.get(url)
    if (response.data) setMaxPrice(response.data[contractAddress]?.usd || 0)
  }

  useEffect(() => {
    getSolPrice()
    fetchPriceByContractAddress("oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h")
  }, [])

  return { solPrice, maxPrice }
}

export default useGetPrice
