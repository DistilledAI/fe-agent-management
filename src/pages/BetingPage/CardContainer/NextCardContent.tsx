import { twMerge } from "tailwind-merge"
import { BET_TYPE } from "."

export const NextCardContent = ({ roundItem }: { roundItem: any }) => {
  const { selectedBet } = roundItem

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3.5 7.625L8 3.125L12.5 7.625M8 3.75V12.875"
                  stroke="#585A6B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>{" "}
              UP ENTERED
            </div>
          ) : (
            <div className="flex w-full cursor-not-allowed items-center justify-center rounded bg-[#30344A] p-2 text-center text-[14px] font-medium text-[#585A6B]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3.5 8.375L8 12.875L12.5 8.375M8 12.25V3.125"
                  stroke={"#585A6B"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>{" "}
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3.5 7.625L8 3.125L12.5 7.625M8 3.75V12.875"
              stroke={"#585A6B"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3.5 8.375L8 12.875L12.5 8.375M8 12.25V3.125"
              stroke={"#585A6B"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
