import { btcIconRote } from "@assets/images"
import { TimerIcon } from "@components/Icons"
import { RootState } from "@configs/store"
import { formatCountdownTime, useCountdown } from "@hooks/useCountdown"
import { Image } from "@nextui-org/react"
import { numberWithCommas } from "@utils/format"
import BigNumber from "bignumber.js"
import { useSelector } from "react-redux"
import { twMerge } from "tailwind-merge"
import { DECMIMAL_SHOW } from "../constants"

const HeaderBet = () => {
  const { price, priceChange } = useSelector(
    (state: RootState) => state.priceInfo,
  )
  // const lockedPrice =

  const isDown = new BigNumber(priceChange).isLessThan(0)
  const isDraw = new BigNumber(priceChange).isEqualTo(0)

  const { timeRemaining } = useCountdown({
    startTime: Math.floor(new Date(1733247924000).getTime()),
    endTime: Math.floor(new Date(1733251524000).getTime()),
    // startTime: Math.floor(Date.now() / 1000),
    // endTime: Math.floor(new Date(1733247924000).getTime() / 1000),
    onStart: () => console.log("started"),
    onEnd: () => console.log("ended"),
  })

  const { minutes, seconds } = formatCountdownTime(timeRemaining)

  return (
    <div className="flex items-center justify-between">
      <div className="">
        <div className="flex items-center gap-2">
          <Image className="h-8 w-8" src={btcIconRote} />
          <p className="text-18 text-[#9192A0]">
            <span className="mr-1 text-white">BTC</span>
            bitcoin price
          </p>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <p className="text-[32px] font-medium leading-none text-[#F3F4F6]">
            $
            {numberWithCommas(new BigNumber(price).toNumber(), undefined, {
              maximumFractionDigits: DECMIMAL_SHOW,
            })}
          </p>
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
      <div>
        <div
          style={{
            boxShadow: "0px -2px 0px 0px rgba(255, 255, 255, 0.08) inset",
          }}
          className="flex items-center rounded-lg bg-[#13141D] px-3 py-2"
        >
          <TimerIcon />
          <div className="w-[85px] text-center font-medium text-[#F3F4F6]">
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
            {` `}(5m)
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderBet
