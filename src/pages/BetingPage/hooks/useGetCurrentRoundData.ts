import { useDispatch, useSelector } from "react-redux"
import { useWallet } from "@solana/wallet-adapter-react"
import { toBN } from "@utils/format"
import { Web3SolanaProgramInteraction } from "program/utils/web3Utils"
import { useEffect, useState } from "react"
import { updatePriceInfo } from "@reducers/priceInfoSlice"
import { RootState } from "@configs/store"

const web3Solana = new Web3SolanaProgramInteraction()

const useGetCurrentRoundData = () => {
  const dispatch = useDispatch()
  const wallet = useWallet()
  const [currentRound, setCurrentRound] = useState<number>(1)
  //   const [currentRoundRefresh, setCurrentRoundRefresh] = useState<number>(1)
  const [currentEventData, setCurrentEventData] = useState<any>()

  const { currentRoundData } = useSelector(
    (state: RootState) => state.priceInfo,
  )

  useEffect(() => {
    ;(async () => {
      try {
        if (wallet) {
          const { eventDataConfig, eventConfigPda } =
            await web3Solana.getEventConfig(wallet)

          if (eventDataConfig && eventConfigPda) {
            const currentRound = toBN((eventDataConfig as any).nextRoundId || 2)
              .minus(1)
              .toNumber()

            console.log("currentRound - useGetCurrentRoundData", currentRound)
            setCurrentRound(currentRound)

            const { eventData: currentEvent } = await web3Solana.getEventData(
              wallet,
              eventConfigPda as any,
              currentRound,
            )
            setCurrentEventData(currentEvent)
            dispatch(
              updatePriceInfo({
                currentRoundData: currentEventData,
              }),
            )
          }
        }
      } catch (error) {
        console.log("error load round", error)
      }
    })()
  }, [wallet])

  return {
    currentRound,
    currentRoundData,
  }
}

export default useGetCurrentRoundData
