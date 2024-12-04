import BetDisclaimer from "@components/BetDisclaimer"
import HeaderBet from "./HeaderBet"
import { useEffect } from "react"
import SwiperList from "./SwiperList"
import { useWallet } from "@solana/wallet-adapter-react"
import { PhantomWalletName } from "@solana/wallet-adapter-wallets"
import useDisclaimer from "./hooks/useDisclaimer"

const Betting = () => {
  const { isOpen, onOpenChange, onAccept } = useDisclaimer()
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
      <BetDisclaimer
        onAccept={onAccept}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <div className="mx-auto mb-10 max-w-[1200px] px-4">
        <HeaderBet />
      </div>
      <SwiperList />
    </div>
  )
}

export default Betting
