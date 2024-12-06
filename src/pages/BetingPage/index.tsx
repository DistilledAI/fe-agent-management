import { logoAgentLand } from "@assets/images"
import { Image } from "@nextui-org/react"
import HeaderBet from "./HeaderBet"
import SwiperList from "./SwiperList"
// import { useGetCurrentRoundData } from "./hooks/useGetRoundData"

const Betting = () => {
  // useGetCurrentRoundData()
  // const { select, publicKey, connect } = useWallet()
  // useEffect(() => {
  //   ;(async () => {
  //     if (!publicKey) {
  //       select(PhantomWalletName)
  //       await connect()
  //     }
  //   })()
  // }, [publicKey])

  // const { currentRoundData } = useSelector(
  //   (state: RootState) => state.priceInfo,
  // )

  return (
    <div>
      <div className="mx-auto mb-10 max-w-[1200px] px-4">
        <HeaderBet />
      </div>
      <SwiperList />
      <div className="fixed bottom-0 left-0 flex w-full items-center justify-center gap-2 bg-[#080A14] pb-5 pt-2">
        <span className="text-14 font-medium uppercase text-[#585A6B]">
          Powered by
        </span>
        <a target="_blank" href="https://agents.land/">
          <Image className="max-h-[34px]" src={logoAgentLand} />
        </a>
      </div>
    </div>
  )
}

export default Betting
