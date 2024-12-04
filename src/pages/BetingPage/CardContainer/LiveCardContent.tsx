import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import { CheckFilledIcon } from "@components/Icons/DefiLens"
import { RootState } from "@configs/store"
import { numberWithCommas } from "@utils/format"
import BigNumber from "bignumber.js"
import { useSelector } from "react-redux"
import { twMerge } from "tailwind-merge"
import { DECMIMAL_SHOW } from "../constants"
import TimeProgress from "./TimeProgress"
import { Divider } from "@nextui-org/react"

export const LiveCardContent = ({ roundItem }: { roundItem: any }) => {
  const { price, priceChange } = useSelector(
    (state: RootState) => state.priceInfo,
  )

  const isDown = new BigNumber(priceChange).isLessThan(0)
  const isUp = new BigNumber(priceChange).isGreaterThan(0)
  const isDraw = new BigNumber(priceChange).isEqualTo(0)

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
      <TimeProgress />
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
              maximumFractionDigits: DECMIMAL_SHOW,
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
                    { maximumFractionDigits: DECMIMAL_SHOW },
                  )}`
                : `+$${numberWithCommas(
                    new BigNumber(priceChange).toNumber(),
                    undefined,
                    { maximumFractionDigits: DECMIMAL_SHOW },
                  )}`}
          </div>
        </div>
      </div>
      <div className="relative w-full cursor-pointer">
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
              {1.87}x Payout
            </span>
          </div>
          <ArrowUpFilledIcon
            bgColor={!isUp ? "#585A6B" : "#9FF4CF"}
            size={18}
          />
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
              {1.87}x Payout
            </span>
          </div>
          <div className="rotate-180">
            <ArrowUpFilledIcon
              bgColor={isDown ? "#E75787" : "#585A6B"}
              size={18}
            />
          </div>
        </div>
      </div>
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
          <span className="text-[#9192A0]">Looked Price</span>
          <span className="text-[#E8E9EE]">$648.8047</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[12px]">
          <span className="text-[#9192A0]">Prize pool</span>
          <span className="text-[#E8E9EE]">212.2690 MAX</span>
        </div>
      </div>
    </div>
  )
}
