import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import { Divider } from "@nextui-org/react"
import { numberWithCommas, toBN } from "@utils/format"
import { twMerge } from "tailwind-merge"
import { BET_TYPE } from "."
import { DECIMAL_SPL } from "../constants"
import { useGetCurrentRoundData } from "../hooks/useGetRoundData"
import MaxBettedInfo from "./MaxBettedInfo"

export const NextCardContent = ({ roundItem }: { roundItem: any }) => {
  const { currentRoundData } = useGetCurrentRoundData()
  //max predict
  const typeMaxBet = roundItem?.predict?.action

  // const downAmount = roundItem?.downAmount || 0
  // const upAmount = roundItem?.upAmount || 0
  // const total = toBN(downAmount).plus(upAmount)

  // const upOffset = !toBN(upAmount).isEqualTo(0)
  //   ? total.div(upAmount).toNumber()
  //   : 1
  // const downOffset = !toBN(downAmount).isEqualTo(0)
  //   ? total.div(downAmount).toNumber()
  //   : 1

  // const userBetUp = roundItem?.userOrder?.outcome?.up
  // const userBetDown = roundItem?.userOrder?.outcome?.down
  // const userBetAmount = toBN(roundItem?.userOrder?.amount || 0)
  //   .div(10 ** DECIMAL_SPL)
  //   .toNumber()

  const downAmount = currentRoundData?.downAmount || 0
  const upAmount = currentRoundData?.upAmount || 0
  const total = toBN(downAmount).plus(upAmount)

  const upOffset = !toBN(upAmount).isEqualTo(0)
    ? total.div(upAmount).toNumber()
    : 1
  const downOffset = !toBN(downAmount).isEqualTo(0)
    ? total.div(downAmount).toNumber()
    : 1

  const userBetUp = currentRoundData?.userOrder?.outcome?.up
  const userBetDown = currentRoundData?.userOrder?.outcome?.down
  const userBetAmount = toBN(currentRoundData?.userOrder?.amount || 0)
    .div(10 ** DECIMAL_SPL)
    .toNumber()

  return (
    <div className="rounded-b-[12px] border border-[#1A1C28] bg-[#13141D] p-4">
      {!(userBetDown || userBetUp) ? (
        <div className="mb-4 flex flex-col rounded-lg bg-[#080A14] p-4">
          <div className="flex w-full cursor-pointer items-center justify-center rounded bg-[#9FF4CF] p-2 text-center text-[14px] font-medium text-[#080A14]">
            ENTER UP
          </div>
          <div className="mt-2 flex w-full cursor-pointer items-center justify-center rounded bg-[#E75787] p-2 text-center text-[14px] font-medium text-[#080A14]">
            ENTER DOWN
          </div>
        </div>
      ) : (
        <div
          className={
            "mb-4 flex cursor-not-allowed flex-col rounded-lg bg-[#080A14] p-4"
          }
        >
          {userBetUp ? (
            <div className="flex w-full cursor-not-allowed items-center justify-center rounded bg-[#30344A] p-2 text-center text-[14px] font-medium text-[#585A6B]">
              <ArrowUpFilledIcon bgColor="#585A6B" size={18} />
              UP ENTERED
            </div>
          ) : (
            <div className="flex w-full cursor-not-allowed items-center justify-center rounded bg-[#30344A] p-2 text-center text-[14px] font-medium text-[#585A6B]">
              <div className="rotate-180">
                <ArrowUpFilledIcon bgColor="#585A6B" size={18} />
              </div>
              DOWN ENTERED
            </div>
          )}
        </div>
      )}
      <div className="relative w-full">
        <div
          className={twMerge(
            "mb-1 flex items-center justify-between rounded-t-lg bg-[#1A1C28] p-3",
          )}
        >
          <div className="flex items-center">
            <span className={twMerge("mr-2 text-[14px] text-[#9FF4CF]")}>
              UP
            </span>
            <span className="text-[12px] text-[rgba(252,_252,_252,_0.50)]">
              {upOffset}x Payout
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MaxBettedInfo betType={typeMaxBet} typeBet={BET_TYPE.UP} />
            <ArrowUpFilledIcon bgColor="#585A6B" size={18} />
          </div>
        </div>
        <div
          className={twMerge(
            "flex items-center justify-between rounded-b-lg bg-[#1A1C28] p-3",
          )}
        >
          <div className="flex items-center">
            <span className={twMerge("mr-2 text-[14px] text-[#E75787]")}>
              DOWN
            </span>
            <span className="text-[12px] text-[rgba(252,_252,_252,_0.50)]">
              {downOffset}x Payout
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MaxBettedInfo betType={typeMaxBet} typeBet={BET_TYPE.DOWN} />
            <div className="rotate-180">
              <ArrowUpFilledIcon bgColor="#585A6B" size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        {(userBetDown || userBetUp) && (
          <>
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-[#9192A0]">Your position</span>
              <span className="text-[#E8E9EE]">
                {numberWithCommas(userBetAmount)} MAX
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[12px]">
              <span className="text-[#9192A0]">Your prediction</span>
              {userBetUp ? (
                <span className="text-[#9FF4CF]">UP</span>
              ) : (
                <span className="text-[#E75787]">DOWN</span>
              )}
            </div>
            <Divider className="my-3 bg-[#30344A]" />
          </>
        )}
        <div className="mt-3 flex items-center justify-between text-[12px]">
          <span className="text-[#9192A0]">Prize pool</span>
          <span className="text-[#E8E9EE]">
            {numberWithCommas(total.div(10 ** DECIMAL_SPL).toNumber())} $MAX
          </span>
        </div>
      </div>
    </div>
  )
}
