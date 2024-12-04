import { bitmaxAva } from "@assets/images"
import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import { Tooltip } from "@nextui-org/react"
import { twMerge } from "tailwind-merge"
import { BET_TYPE } from "."

export const NextCardContent = ({ roundItem }: { roundItem: any }) => {
  const { selectedBet } = roundItem

  const renderDisplayMaxBet = (betType: any) => {
    const isActive = betType === BET_TYPE.DOWN

    if (!isActive) return <div />

    return (
      <Tooltip
        content={
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M5.41406 12.25H10.1172C10.5465 12.25 10.8992 11.9875 11.0523 11.6102L12.6137 7.90781C12.6602 7.7875 12.6848 7.66172 12.6848 7.525V6.46953C12.6848 5.89258 12.2199 5.25 11.6512 5.25H8.3918L8.88398 3.02148L8.90039 2.85742C8.90039 2.64141 8.81289 2.44453 8.67344 2.30234L8.12109 1.75L4.67578 5.23086C4.48984 5.41953 4.375 5.68203 4.375 5.97188V11.2219C4.375 11.7988 4.84531 12.25 5.41406 12.25Z"
                fill="#E8E9EE"
              />
              <path
                d="M1.3125 6.125H3.0625V12.25H1.3125V6.125Z"
                fill="#E8E9EE"
              />
            </svg>
            <span className="text-12 font-medium text-[#F7F7F7]">
              MAX’s bet DOWN
            </span>
          </div>
        }
        placement="right"
        showArrow
        classNames={{
          content: "bg-[#30344A] p-2",
        }}
        offset={40}
      >
        <img className="h-4 w-4 rounded-full bg-white" src={bitmaxAva} />
      </Tooltip>
    )
  }

  return (
    <div className="rounded-b-[12px] border border-[#1A1C28] bg-[#13141D] p-4">
      {![BET_TYPE.DOWN, BET_TYPE.UP].includes(selectedBet) ? (
        <div className={"mb-4 flex flex-col rounded-lg bg-[#080A14] p-4"}>
          <div className="flex w-full items-center justify-center rounded bg-[#9FF4CF] p-2 text-center text-[14px] font-medium text-[#080A14]">
            ENTER UP
          </div>
          <div className="mt-2 flex w-full items-center justify-center rounded bg-[#E75787] p-2 text-center text-[14px] font-medium text-[#080A14]">
            ENTER DOWN
          </div>
        </div>
      ) : (
        <div className={"mb-4 flex flex-col rounded-lg bg-[#080A14] p-4"}>
          {selectedBet === BET_TYPE.UP ? (
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
      <div className="relative w-full cursor-pointer">
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
              {0}x Payout
            </span>
          </div>
          <div className="flex items-center gap-1">
            {renderDisplayMaxBet(BET_TYPE.DRAW)}
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
              {0}x Payout
            </span>
          </div>
          <div className="flex items-center gap-1">
            {renderDisplayMaxBet(BET_TYPE.DOWN)}
            <div className="rotate-180">
              <ArrowUpFilledIcon bgColor="#585A6B" size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-[#9192A0]">Prize pool</span>
          <span className="text-[#E8E9EE]">648.8047 MAX</span>
        </div>
      </div>
    </div>
  )
}
