import { CheckFilledIcon } from "@components/Icons/DefiLens"
import { twMerge } from "tailwind-merge"
import TimeProgress from "../TimeProgress"
import { Divider } from "@nextui-org/react"
import LiveCardPrice from "./LivePrice"
import BigNumber from "bignumber.js"
import { numberWithCommas } from "@utils/format"
import { useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { Web3SolanaProgramInteraction } from "program/utils/web3Utils"

const web3Solana = new Web3SolanaProgramInteraction()

const CardLiveBet = ({ roundItem }: { roundItem: any }) => {
  // const [eventConfig, setEventConfig] = useState()
  const [currentEventData, setCurrentEventData] = useState<any>()
  const wallet = useWallet()

  useEffect(() => {
    ;(async () => {
      try {
        if (currentEventData) {
          return
        }

        if (wallet) {
          const { eventDataConfig, eventConfigPda } =
            await web3Solana.getEventConfig(wallet)

          if (eventDataConfig && eventConfigPda) {
            // setEventConfig(eventDataConfig as any)
            const currentRound = new BigNumber(eventDataConfig.nextRoundId || 2)
              .minus(1)
              .toNumber()

            console.log("currentRound", currentRound)

            const event = await web3Solana.getEventData(
              wallet,
              eventConfigPda,
              currentRound,
            )

            console.log("event", event)
            setCurrentEventData(event)
          }
        }
      } catch (error) {
        console.log("error", error)
      }
    })()
  })

  const startTime = currentEventData?.startTime
    ? new BigNumber(currentEventData?.startTime).multipliedBy(1000).toNumber()
    : Date.now()
  const endTime = currentEventData?.lockTime
    ? new BigNumber(currentEventData?.lockTime).multipliedBy(1000).toNumber()
    : Date.now()

  const downAmount = currentEventData?.downAmount || 0
  const upAmount = currentEventData?.upAmount || 0
  const total = new BigNumber(downAmount).plus(upAmount)
  const lockPrice = new BigNumber(currentEventData?.lockPrice || 0).toNumber()

  return (
    <div className="rounded-b-[12px] border border-[#1A1C28] bg-[#13141D] p-4">
      <div
        className={twMerge(
          "absolute left-1/2 top-0 flex h-5 -translate-x-1/2 -translate-y-1/2 items-center rounded-sm border border-[#080A14] bg-[#E4775D] p-[6px] text-[12px] text-[#080A14] shadow shadow-[#rgba(0,_0,_0,_0.16)]",
        )}
      >
        <CheckFilledIcon size={12} color="#080A14" />
        <span className="ml-1">ENTERED</span>
      </div>
      <TimeProgress startTime={startTime} endTime={endTime} />
      <LiveCardPrice currentRound={currentEventData} />
      <div className="mt-6 flex flex-col">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-[#9192A0]">Your position</span>
          <span className="text-[#E8E9EE]">-- MAX</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[12px]">
          <span className="text-[#9192A0]">Your prediction</span>
          <span className="text-[#9FF4CF]">UP</span>
        </div>
        <Divider className="my-3 bg-[#30344A]" />
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-[#9192A0]">Locked Price</span>
          <span className="text-[#E8E9EE]">${numberWithCommas(lockPrice)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[12px]">
          <span className="text-[#9192A0]">Prize pool</span>
          <span className="text-[#E8E9EE]">
            {numberWithCommas(total.toNumber())} MAX
          </span>
        </div>
      </div>
    </div>
  )
}

export default CardLiveBet
