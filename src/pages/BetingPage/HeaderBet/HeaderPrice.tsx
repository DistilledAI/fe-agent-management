import { btcIconRote } from "@assets/images"
import { RootState } from "@configs/store"
import { Image } from "@nextui-org/react"
import { numberWithCommas } from "@utils/format"
import BigNumber from "bignumber.js"
import { useSelector } from "react-redux"
import { DECIMAL_SHOW } from "../constants"
import { twMerge } from "tailwind-merge"
import useGetPriceRealtime from "../hooks/useGetPriceRealtime"

const HeaderPrice = () => {
  useGetPriceRealtime()

  const { price, priceChange } = useSelector(
    (state: RootState) => state.priceInfo,
  )

  const isDown = new BigNumber(priceChange).isLessThan(0)
  const isDraw = new BigNumber(priceChange).isEqualTo(0)

  return (
    <div className="">
      <div className="flex items-center gap-2">
        <Image className="h-8 w-8" src={btcIconRote} />
        <p className="text-18 text-[#9192A0] max-md:text-16">
          <span className="mr-1 text-white">BTC</span>
          bitcoin
        </p>
      </div>
      <div className="mt-3 flex items-center gap-2 max-md:mt-2">
        <p className="text-[32px] font-medium leading-none text-[#F3F4F6] max-md:text-[22px]">
          $
          {numberWithCommas(new BigNumber(price).toNumber(), undefined, {
            maximumFractionDigits: DECIMAL_SHOW,
          })}
        </p>
        <div
          className={twMerge(
            "mt-1 flex h-5 items-center justify-center rounded-sm bg-[#9FF4CF] p-1 text-[12px] text-[#052E1C]",
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
  )
}

export default HeaderPrice
