import { twMerge } from "tailwind-merge"
import { BET_TYPE } from "."

export const ExpireCardContent = ({ roundItem }: { roundItem: any }) => {
  const { selectedBet, result } = roundItem
  const isDown = result === BET_TYPE.DOWN
  const isDraw = result === BET_TYPE.DRAW
  const isUp = result === BET_TYPE.UP

  return (
    <div className="rounded-b-[12px] border border-[#1A1C28] bg-[#13141D] p-4">
      <div
        className={twMerge(
          "mb-4 rounded-lg border border-[#9FF4CF] bg-[#080A14] p-4",
          // FIXME: realtime price check
          isDown && "border-[#E75787]",
          isDraw && "border-[#1A1C28]",
        )}
      >
        <div className="mb-2 text-[12px] text-[#9192A0]">Last Price</div>
        <div className="flex items-center justify-between gap-2">
          <div className="text-[24px] font-medium text-[#E8E9EE]">
            $0.002370
          </div>

          <div
            className={twMerge(
              "flex h-5 items-center justify-center rounded-sm bg-[#9FF4CF] p-1 text-[12px] text-[#052E1C]",
              // FIXME: realtime price check
              isDown && "bg-[#E75787] text-[#080A14]",
              isDraw && "bg-[#1A1C28] text-[#585A6B]",
            )}
          >
            {isDraw ? "+0.00" : isDown ? `-${1.25}` : `+${5.25}`}%
          </div>
        </div>
      </div>
      <div className="mb-6 w-full cursor-pointer">
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
              {isDraw ? 1 : 1.87}x Payout
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3.5 7.625L8 3.125L12.5 7.625M8 3.75V12.875"
              stroke={!isUp ? "#585A6B" : "#9FF4CF"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
                !isDown && "mr-2 text-[14px] text-[#585A6B]",
                isDown && "mr-2 text-[14px] text-[#E75787]",
              )}
            >
              DOWN
            </span>
            <span className="text-[12px] text-[rgba(252,_252,_252,_0.50)]">
              {isDraw ? 1 : 1.87}x Payout
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3.5 8.375L8 12.875L12.5 8.375M8 12.25V3.125"
              stroke={isDown ? "#E75787" : "#585A6B"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-[#9192A0]">Looked Price</span>
          <span className="text-[#E8E9EE]">$648.8047</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[12px]">
          <span className="text-[#9192A0]">Prize pool</span>
          <span className="text-[#E8E9EE]">212.2690 MAX</span>
        </div>
      </div>
      {result === selectedBet && (
        <button
          // disabled={!formValid || isLoading}
          className="mt-4 w-full cursor-pointer rounded border-[2px] border-solid border-[rgba(255,255,255,0.25)] p-1 uppercase transition-all duration-150 ease-in hover:border-[rgba(255,255,255)] disabled:cursor-not-allowed disabled:opacity-75"
        >
          <div className="rounded bg-white px-6 py-2 uppercase text-[#080A14]">
            Collect winnings
          </div>
        </button>
      )}
    </div>
  )
}
