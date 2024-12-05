import { RootState } from "@configs/store"
import { updateCurrentRound, updateLiveRound } from "@reducers/priceInfoSlice"
import { useWallet } from "@solana/wallet-adapter-react"
import { toBN } from "@utils/format"
import { Web3SolanaProgramInteraction } from "program/utils/web3Utils"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const web3Solana = new Web3SolanaProgramInteraction()

let interval: NodeJS.Timeout
let intervalId: NodeJS.Timeout
export const useGetCurrentRoundData = () => {
  const dispatch = useDispatch()
  const wallet = useWallet()
  const [currentRound, setCurrentRound] = useState<number>(1)
  // const [currentEventData, setCurrentEventData] = useState<any>()

  const { currentRoundData } = useSelector(
    (state: RootState) => state.priceInfo,
  )

  useEffect(() => {
    const fetchRoundData = async () => {
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

            const { eventData: currentEvent, eventPDA } =
              await web3Solana.getEventData(
                wallet,
                eventConfigPda as any,
                currentRound,
              )
            const userOrder = await web3Solana.getBetInfoByUser(
              wallet,
              eventPDA as any,
            )
            // setCurrentEventData(currentEvent)
            dispatch(
              updateCurrentRound({
                currentRoundData: { ...(currentEvent || {}), userOrder },
              }),
            )
          }
        }
      } catch (error) {
        console.error("Error loading round data", error)
      }
    }

    // Initial fetch
    fetchRoundData()

    // Set interval to fetch every 5 seconds
    interval = setInterval(() => {
      fetchRoundData()
    }, 5000)

    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [wallet, dispatch])

  return {
    currentRound,
    currentRoundData,
  }
}

export const useGetRoundDataById = (id: number) => {
  const dispatch = useDispatch()
  const wallet = useWallet()
  // const [currentEventData, setCurrentEventData] = useState<any>()

  const { liveRoundData } = useSelector((state: RootState) => state.priceInfo)

  useEffect(() => {
    const fetchRoundDataById = async () => {
      try {
        if (wallet) {
          const { eventDataConfig, eventConfigPda } =
            await web3Solana.getEventConfig(wallet)

          if (eventDataConfig && eventConfigPda) {
            const { eventData: currentEvent } = await web3Solana.getEventData(
              wallet,
              eventConfigPda as any,
              id,
            )
            // setCurrentEventData(currentEvent)
            dispatch(
              updateLiveRound({
                liveRoundData: currentEvent,
              }),
            )
          }
        }
      } catch (error) {
        console.error("Error loading round data by ID", error)
      }
    }

    // Initial fetch
    fetchRoundDataById()

    // Set interval to fetch every 5 seconds
    intervalId = setInterval(() => {
      fetchRoundDataById()
    }, 5000)

    return () => clearInterval(intervalId) // Cleanup interval on component unmount
  }, [wallet, id, dispatch])

  return {
    liveRoundData,
    id,
  }
}
