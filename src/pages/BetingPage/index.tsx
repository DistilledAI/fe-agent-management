import { logoAgentLand } from "@assets/images"
import { Image } from "@nextui-org/react"
import HeaderBet from "./HeaderBet"
import SwiperList from "./SwiperList"
import { useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { PhantomWalletName } from "@solana/wallet-adapter-wallets"

const Betting = () => {
  const wallet = useWallet()

  useEffect(() => {
    const provider = window?.solana
    if (provider) {
      provider?.on("accountChanged", (publicKeySol: any) => {
        console.log("publicKeySol", publicKeySol?.toString())
        // Attempt to reconnect to Phantom
        if (publicKeySol) {
          wallet.select(PhantomWalletName)
        }

        provider.connect().catch((error: any) => {
          console.error({ errorSolAccountChanged: error })
        })
      })
    }

    return () => {}
  }, [])

  return (
    <div>
      <div className="mx-auto mb-10 max-w-[1200px] px-4 max-md:mb-1">
        <HeaderBet />
      </div>
      <SwiperList />
      <div className="fixed bottom-0 left-0 z-10 flex w-full items-center justify-center gap-2 bg-[#080A14] pb-3 pt-2 max-md:pb-2 max-md:pt-1">
        <span className="text-14 font-medium uppercase text-[#585A6B] max-md:text-[11px]">
          Powered by
        </span>
        <a target="_blank" href="https://agents.land/">
          <Image
            className="max-h-[34px] max-md:max-h-[26px]"
            src={logoAgentLand}
          />
        </a>
      </div>
    </div>
  )
}

export default Betting
