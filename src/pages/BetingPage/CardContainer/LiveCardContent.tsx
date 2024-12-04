import { twMerge } from "tailwind-merge"

export const LiveCardContent = ({ roundItem }: { roundItem: any }) => {
  const { round } = roundItem
  const isBeingDown = round % 2

  return (
    <div className="rounded-b-[12px] border border-[#1A1C28] bg-[#13141D] p-4">
      <div
        className={twMerge(
          "absolute left-1/2 top-0 flex h-5 -translate-x-1/2 -translate-y-1/2 items-center rounded-sm border border-[#080A14] bg-[#E4775D] p-[6px] text-[12px] text-[#080A14] shadow shadow-[#rgba(0,_0,_0,_0.16)]",
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M9.75 3L4.5 9L2.25 6.75"
            stroke="#080A14"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="ml-1">ENTERED</span>
      </div>
      <div
        className={twMerge(
          "mb-6 rounded-lg border border-[#9FF4CF] bg-[#080A14] p-4",
          // FIXME: realtime price check
          isBeingDown && "border-[#E75787]",
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
              isBeingDown && "bg-[#E75787] text-[#080A14]",
            )}
          >
            {isBeingDown ? "-" : "+"}1.25%
          </div>
        </div>
      </div>
      <div className="relative w-full cursor-pointer">
        <div
          className={twMerge(
            "mb-1 flex items-center justify-between rounded-t-lg bg-[rgba(159,_244,_207,_0.16)] p-3",
            isBeingDown && "bg-[#1A1C28]",
          )}
        >
          <div className="flex items-center">
            <span
              className={twMerge(
                "mr-2 text-[14px] text-[#9FF4CF]",
                isBeingDown && "text-[#585A6B]",
              )}
            >
              UP
            </span>
            <span className="text-[12px] text-[rgba(252,_252,_252,_0.50)]">
              {1.87}x Payout
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
              stroke={isBeingDown ? "#585A6B" : "#9FF4CF"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          className={twMerge(
            "flex items-center justify-between rounded-b-lg bg-[#1A1C28] p-3",
            isBeingDown && "bg-[rgba(231,87,135,0.16)]",
          )}
        >
          <div className="flex items-center">
            <span
              className={twMerge(
                "mr-2 text-[14px] text-[#585A6B]",
                isBeingDown && "text-[#E75787]",
              )}
            >
              DOWN
            </span>
            <span className="text-[12px] text-[rgba(252,_252,_252,_0.50)]">
              {1.87}x Payout
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
              stroke={isBeingDown ? "#E75787" : "#585A6B"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
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
