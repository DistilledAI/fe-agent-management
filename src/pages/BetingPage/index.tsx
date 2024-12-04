import HeaderBet from "./HeaderBet"
import { useEffect } from "react"
import useGetPriceRealtime from "./hooks/useGetPriceRealtime"
import SwiperList from "./SwiperList"
import { useWallet } from "@solana/wallet-adapter-react"
import { PhantomWalletName } from "@solana/wallet-adapter-wallets"

const Betting = () => {
  useGetPriceRealtime()
  const { select, publicKey, connect } = useWallet()

  useEffect(() => {
    ;(async () => {
      if (!publicKey) {
        select(PhantomWalletName)
        await connect()
      }
    })()
  }, [publicKey])

  return (
    <div>
      <div className="mx-auto mb-10 max-w-[1200px] px-4">
        <HeaderBet />
      </div>
      <SwiperList />
    </div>
  )
}

export default Betting
