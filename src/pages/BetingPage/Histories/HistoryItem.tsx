import { loadingButtonIcon } from "@assets/svg"
import { OpenBlankTabIcon } from "@components/Icons/DefiLens"
import { CoinGeckoId, useCoinGeckoPrices } from "@hooks/useCoingecko"
import { useWallet } from "@solana/wallet-adapter-react"
import { numberWithCommas } from "@utils/format"
import { Web3SolanaProgramInteraction } from "program/utils/web3Utils"
import { FC, useState } from "react"
import { twMerge } from "tailwind-merge"
import { BET_TYPE } from "../CardContainer"

const HistoryItem: FC<{ item: any; setIsClaimed: any }> = ({
  item,
  setIsClaimed,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isClaimed, setClaimed] = useState(false)
  const wallet = useWallet()
  const isDraw = item.result === BET_TYPE.DRAW
  const isCalculating = item.isCalculating
  const isWon = item.result === item.userPrediction
  const isLose =
    !isDraw && item.result !== item.userPrediction && !isCalculating
  const isShowClaim = (isWon || isDraw) && !isClaimed
  const { data: prices } = useCoinGeckoPrices()
  const MAXPrice = Number(prices?.[CoinGeckoId["max-2"]] || 0)

  return (
    <div className="rounded-lg border border-[#30344A] bg-[#13141d] p-4">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          {isCalculating ? (
            <div className="text-[14px] font-medium text-[#E8E9EE]">
              Calculating...
            </div>
          ) : (
            <div className="text-[14px] font-medium text-[#E8E9EE]">
              {isWon ? "Won" : isDraw ? "Draw" : "Lose"}
            </div>
          )}
          {isCalculating ? (
            <div className={twMerge("mt-2 animate-pulse")}>
              <div className="h-6 w-[120px] rounded bg-[#080A14] text-[18px] font-medium"></div>
              <div className="mt-1 h-6 w-[80px] rounded bg-[#080A14] text-[12px] font-medium"></div>
            </div>
          ) : (
            <div className={twMerge("mt-2")}>
              <p
                className={twMerge(
                  "text-[18px] font-medium text-[#9FF4CF]",
                  isDraw && "text-[#9192A0]",
                  isLose && "text-[#E75787]",
                )}
              >
                {isLose && "-"}
                {numberWithCommas(item.reward)} MAX
              </p>
              <p className="mt-1 text-[12px] font-medium text-[#585A6B]">
                ~${MAXPrice ? numberWithCommas(item.reward * MAXPrice) : "--"}
              </p>
            </div>
          )}
        </div>
        {isShowClaim &&
          (item.isClaimed ? (
            <a
              href={`https://solscan.io/tx/${item.claimTx}`}
              target="_blank"
              className="flex h-8 cursor-pointer items-center justify-center rounded bg-[#1A1C28] px-4 py-2 font-medium uppercase text-[#585A6B] transition-all hover:underline hover:brightness-150"
            >
              Collected
              <OpenBlankTabIcon size={24} />
            </a>
          ) : (
            <button
              className="flex h-8 items-center justify-center rounded bg-[#FCFCFC] px-4 py-2 font-medium text-[#080A14]"
              disabled={!wallet.publicKey || isLoading}
              onClick={async () => {
                try {
                  setIsLoading(true)

                  const web3Solana = new Web3SolanaProgramInteraction()
                  const res = await web3Solana.claimOrder(
                    wallet,
                    item.id,
                    item.eventAddr,
                  )

                  if (res) {
                    setIsClaimed()
                    setClaimed(true)
                  }
                } catch (error) {
                  console.log("claim error", error)
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
        <span
          //   href={`https://solscan.io/account/${item.eventAddr}`}
          //   target="_blank"
          className="text-[#E8E9EE]"
        >
          {/* {reduceString(item.eventAddr)} */}#{item.id}
        </span>
      </div>
      <div className="mt-4 w-full border border-[#1A1C28]"></div>
      <div className="mt-4 flex items-center justify-between gap-2 text-[14px] font-medium">
        <span className="text-[#9192A0]">Your position</span>
        <span className="text-[#E8E9EE]">
          {numberWithCommas(item.amount)} MAX
        </span>
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
