import { formatCountdownTime, TIMER, useCountdown } from "@hooks/useCountdown"
import { toBN } from "@utils/format"
import { twMerge } from "tailwind-merge"

export const LaterCardContent = ({ roundItem }: { roundItem: any }) => {
  const startTime = roundItem?.start
    ? toBN(roundItem?.start).toNumber()
    : Math.floor(Date.now() / TIMER.MILLISECOND)
  const endTime = roundItem?.end
    ? toBN(roundItem?.end).toNumber()
    : Math.floor(Date.now() / TIMER.MILLISECOND)

  const { timeRemaining, start, end, isStarted } = useCountdown({
    startTime,
    endTime,
    onStart: () => console.log("started"),
    onEnd: () => console.log("ended"),
  })

  const { minutes, seconds } = formatCountdownTime(timeRemaining)

  return (
    <div className="rounded-b-[12px] border border-[#1A1C28] bg-[#13141D] p-4">
      <div className={"mb-4 flex flex-col rounded-lg bg-[#080A14] p-4"}>
        <div className="mb-2 text-[12px] text-[#9192A0]">Entry starts</div>
        <div className="flex items-center justify-between gap-2">
          <div className="text-[24px] font-medium text-[#E8E9EE]">
            ~<span>{minutes}</span>:<span>{seconds}</span>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7.64062 13.0195C7.44141 13.0195 7.27441 12.9521 7.13965 12.8174C7.00488 12.6826 6.9375 12.5156 6.9375 12.3164C6.9375 12.1172 7.00488 11.9531 7.13965 11.8242C7.27441 11.6895 7.44141 11.6221 7.64062 11.6221H11.376V6.55957C11.376 6.36621 11.4434 6.20215 11.5781 6.06738C11.7129 5.93262 11.877 5.86523 12.0703 5.86523C12.2695 5.86523 12.4365 5.93262 12.5713 6.06738C12.7061 6.20215 12.7734 6.36621 12.7734 6.55957V12.3164C12.7734 12.5156 12.7061 12.6826 12.5713 12.8174C12.4365 12.9521 12.2695 13.0195 12.0703 13.0195H7.64062ZM12.0791 21C10.8252 21 9.65039 20.7627 8.55469 20.2881C7.45898 19.8193 6.49512 19.1689 5.66309 18.3369C4.83105 17.5107 4.17773 16.5498 3.70312 15.4541C3.23438 14.3525 3 13.1748 3 11.9209C3 10.667 3.23438 9.49219 3.70312 8.39648C4.17773 7.29492 4.83105 6.32812 5.66309 5.49609C6.49512 4.66406 7.45898 4.01367 8.55469 3.54492C9.65039 3.07617 10.8252 2.8418 12.0791 2.8418C13.333 2.8418 14.5078 3.07617 15.6035 3.54492C16.7051 4.01367 17.6719 4.66406 18.5039 5.49609C19.3359 6.32812 19.9863 7.29492 20.4551 8.39648C20.9297 9.49219 21.167 10.667 21.167 11.9209C21.167 13.1748 20.9297 14.3525 20.4551 15.4541C19.9863 16.5498 19.3359 17.5107 18.5039 18.3369C17.6719 19.1689 16.7051 19.8193 15.6035 20.2881C14.5078 20.7627 13.333 21 12.0791 21ZM12.0791 19.207C13.0869 19.207 14.0303 19.0166 14.9092 18.6357C15.7881 18.2607 16.5615 17.7393 17.2295 17.0713C17.9033 16.4033 18.4277 15.6299 18.8027 14.751C19.1777 13.8721 19.3652 12.9287 19.3652 11.9209C19.3652 10.9131 19.1777 9.96973 18.8027 9.09082C18.4277 8.20605 17.9033 7.43262 17.2295 6.77051C16.5615 6.10254 15.7881 5.58105 14.9092 5.20605C14.0303 4.8252 13.0869 4.63477 12.0791 4.63477C11.0771 4.63477 10.1338 4.8252 9.24902 5.20605C8.37012 5.58105 7.59668 6.10254 6.92871 6.77051C6.26074 7.43262 5.73633 8.20605 5.35547 9.09082C4.98047 9.96973 4.79297 10.9131 4.79297 11.9209C4.79297 12.9287 4.98047 13.8721 5.35547 14.751C5.73633 15.6299 6.26074 16.4033 6.92871 17.0713C7.59668 17.7393 8.37012 18.2607 9.24902 18.6357C10.1338 19.0166 11.0771 19.207 12.0791 19.207Z"
              fill="#9192A0"
            />
          </svg>
        </div>
      </div>

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
      {/* <div className="mt-6 flex flex-col">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-[#9192A0]">Prize pool</span>
          <span className="text-[#E8E9EE]">648.8047 MAX</span>
        </div>
      </div> */}
    </div>
  )
}
