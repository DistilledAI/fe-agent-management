import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import { RootState } from "@configs/store"
import { DECIMAL_SHOW } from "@pages/BetingPage/constants"
import { numberWithCommas, toBN } from "@utils/format"
import BigNumber from "bignumber.js"
import { useSelector } from "react-redux"
import { twMerge } from "tailwind-merge"
import { BET_TYPE } from ".."
import MaxBettedInfo from "../MaxBettedInfo"

const LiveCardPrice = ({
  currentRound,
  roundItem,
}: {
  currentRound: any
  roundItem?: any
}) => {
  const { price } = useSelector((state: RootState) => state.priceInfo)
  //max predict
  const typeMaxBet = roundItem?.predict?.action

  const downAmount = currentRound?.downAmount || 0
  const upAmount = currentRound?.upAmount || 0
  const total = toBN(currentRound.total || 0)
  const lockPrice = toBN(currentRound.lockPrice)
  const upOffset = !toBN(upAmount).isEqualTo(0)
    ? numberWithCommas(total.div(upAmount).toNumber())
    : 1
  const downOffset = !toBN(downAmount).isEqualTo(0)
    ? numberWithCommas(total.div(downAmount).toNumber())
    : 1

  const priceChange = new BigNumber(price).minus(lockPrice).toNumber()

  const isDown = new BigNumber(priceChange).isLessThan(0)
  const isUp = new BigNumber(priceChange).isGreaterThan(0)
  const isDraw = new BigNumber(priceChange).isEqualTo(0)

  return (
    <>
      <div
        className={twMerge(
          "mb-6 rounded-lg border border-[#9FF4CF] bg-[#080A14] p-4",
          isDown && "border-[#E75787]",
          isDraw && "border-[#1A1C28]",
        )}
      >
        <div className="mb-2 text-[12px] text-[#9192A0]">Last Price</div>
        <div className="flex items-center justify-between gap-2">
          <div className="text-[24px] font-medium text-[#E8E9EE]">
            $
            {numberWithCommas(new BigNumber(price).toNumber(), undefined, {
              maximumFractionDigits: DECIMAL_SHOW,
            })}
          </div>

          <div
            className={twMerge(
              "flex h-5 items-center justify-center rounded-sm bg-[#9FF4CF] p-1 text-[12px] text-[#052E1C]",
              isDown && "bg-[#E75787] text-[#080A14]",
              isDraw && "bg-[#1A1C28] text-[#585A6B]",
            )}
          >
            {isDraw
              ? "$0.00"
              : isDown
                ? `-$${numberWithCommas(
                    new BigNumber(priceChange).multipliedBy(-1).toNumber(),
                    undefined,
                    { maximumFractionDigits: DECIMAL_SHOW },
                  )}`
                : `+$${numberWithCommas(
                    new BigNumber(priceChange).toNumber(),
                    undefined,
                    { maximumFractionDigits: DECIMAL_SHOW },
                  )}`}
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <div
          className={twMerge(
            "mb-1 flex items-center justify-between rounded-t-lg bg-[rgba(159,_244,_207,_0.16)] p-3",
            (isDraw || isDown) && "bg-[#1A1C28]",
          )}
        >
          <div className="flex items-center">
            <span
              className={twMerge(
                "mr-2 text-[14px] text-[#9FF4CF]",
                !isUp && "bg-[#1A1C28] text-[#585A6B]",
              )}
            >
              UP
            </span>
            <span className="text-[12px] text-[rgba(252,_252,_252,_0.50)]">
              {upOffset}x Payout
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MaxBettedInfo betType={typeMaxBet} typeBet={BET_TYPE.UP} />
            <ArrowUpFilledIcon
              bgColor={!isUp ? "#585A6B" : "#9FF4CF"}
              size={18}
            />
          </div>
        </div>
        <div
          className={twMerge(
            "flex items-center justify-between rounded-b-lg bg-[#1A1C28] p-3",
            isDown && "bg-[rgba(231,87,135,0.16)]",
            isDraw && "bg-[#1A1C28]",
          )}
        >
          <div className="flex items-center">
            <span
              className={twMerge(
                "mr-2 text-[14px] text-[#585A6B]",
                isDown && "mr-2 text-[14px] text-[#E75787]",
              )}
            >
              DOWN
            </span>
            <span className="text-[12px] text-[rgba(252,_252,_252,_0.50)]">
              {downOffset}x Payout
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MaxBettedInfo betType={typeMaxBet} typeBet={BET_TYPE.DOWN} />
            <div className="rotate-180">
              <ArrowUpFilledIcon
                bgColor={isDown ? "#E75787" : "#585A6B"}
                size={18}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LiveCardPrice
