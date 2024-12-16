import { loadingButtonIcon } from "@assets/svg"
import { FC, useState } from "react"
import { twMerge } from "tailwind-merge"
import { BET_TYPE } from "../CardContainer"
import { CoinGeckoId, useCoinGeckoPrices } from "@hooks/useCoingecko"
import { numberWithCommas } from "@utils/format"

const HistoryItem: FC<{ item: any }> = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false)
  const isDraw = item.result === BET_TYPE.DRAW
  const isWon = item.result === item.userPrediction
  const isLose = item.result !== item.userPrediction
  const isShowClaim = item.result === item.userPrediction || isDraw
  const { data: prices } = useCoinGeckoPrices()
  const MAXPrice = Number(prices?.[CoinGeckoId["max-2"]] || 0)

  return (
    <div className="rounded-lg border border-[#30344A] bg-[#13141d] p-4">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <div className="text-[14px] font-medium text-[#E8E9EE]">
            {isWon ? "Won" : isDraw ? "Draw" : "Lose"}
          </div>
          <div className={twMerge("mt-2")}>
            <p
              className={twMerge(
                "text-[18px] font-medium text-[#9FF4CF]",
                isDraw && "text-[#9192A0]",
                isLose && "text-[#E75787]",
              )}
            >
              {isLose && "-"}
              {!isWon ? item.amount : item.reward} MAX
            </p>
            <p className="mt-1 text-[12px] font-medium text-[#585A6B]">
              ~${MAXPrice ? numberWithCommas(item.reward * MAXPrice) : "--"}
            </p>
          </div>
        </div>
        {isShowClaim &&
          (item.isClaimed ? (
            <div className="flex h-8 items-center justify-center rounded bg-[#1A1C28] px-4 py-2 font-medium uppercase text-[#585A6B]">
              Collected
            </div>
          ) : (
            <button
              className="flex h-8 items-center justify-center rounded bg-[#FCFCFC] px-4 py-2 font-medium text-[#080A14]"
              onClick={() => {
                try {
                  console.log("claim")
                  setIsLoading(true)
                } catch (error) {
                  console.log("error", error)
                } finally {
                  setIsLoading(false)
                }
              }}
            >
              {isLoading && (
                <img src={loadingButtonIcon} alt="loadingButtonIcon" />
              )}
              COLLECT
            </button>
          ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 text-[14px] font-medium">
        <span className="text-[#9192A0]">Round</span>
        <span className="text-[#E8E9EE]">#{item.round}</span>
      </div>
      <div className="mt-4 w-full border border-[#1A1C28]"></div>
      <div className="mt-4 flex items-center justify-between gap-2 text-[14px] font-medium">
        <span className="text-[#9192A0]">Your position</span>
        <span className="text-[#E8E9EE]">{item.amount} MAX</span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 text-[14px] font-medium">
        <span className="text-[#9192A0]">Your prediction</span>
        <span
          className={twMerge(
            "uppercase text-[#9FF4CF]",
            item.userPrediction === BET_TYPE.DOWN && "text-[#E75787]",
          )}
        >
          {item.userPrediction}
        </span>
      </div>
    </div>
  )
}

export default HistoryItem
