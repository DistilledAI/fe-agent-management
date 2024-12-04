import { useEffect, useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import {
  FreeMode,
  Keyboard,
  Mousewheel,
  //   Pagination,
  Virtual,
} from "swiper/modules"
import useSwiper from "@hooks/useSwiper"
import delay from "lodash/delay"
import { twMerge } from "tailwind-merge"
import { formatCountdownTime, useCountdown } from "@hooks/useCountdown"
import { starIcon } from "@assets/svg"

export const CHART_DOT_CLICK_EVENT = "CHART_DOT_CLICK_EVENT"

const SwiperList = () => {
  const { setSwiper, swiper } = useSwiper()
  // const { currentEpoch, rounds } = useGetSortedRoundsCurrentEpoch()
  // const previousEpoch = currentEpoch > 0 ? currentEpoch - 1 : currentEpoch
  // const swiperIndex = rounds?.findIndex((round) => round.epoch === previousEpoch)

  // useOnNextRound()
  // useOnViewChange(swiperIndex ?? 0, view)

  useEffect(() => {
    const handleChartDotClick = () => {
      setIsChangeTransition(true)
      delay(() => setIsChangeTransition(false), 3000)
    }
    swiper?.el?.addEventListener(CHART_DOT_CLICK_EVENT, handleChartDotClick)

    return () => {
      swiper?.el?.removeEventListener(
        CHART_DOT_CLICK_EVENT,
        handleChartDotClick,
      )
    }
  }, [swiper?.el])

  const [, setIsChangeTransition] = useState(false) // isChangeTransition

  return (
    <>
      <Swiper
        // initialSlide={swiperIndex}
        initialSlide={4}
        onSwiper={setSwiper}
        spaceBetween={16}
        // slidesPerView={4}
        slidesPerView="auto"
        onBeforeDestroy={() => setSwiper(null)}
        freeMode={{
          enabled: true,
          sticky: true,
          momentumRatio: 0.25,
          momentumVelocityRatio: 0.5,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Virtual, Keyboard, Mousewheel, FreeMode]}
        centeredSlides
        mousewheel
        keyboard
        resizeObserver
      >
        {LIST_MOCKED.map((roundItem, key) => (
          <SwiperSlide key={`${key}-swiper-${roundItem.round}`}>
            {/* <RoundCard round={round} isActive={isChangeTransition && isActive} /> */}

            {({ isActive }) => (
              <div
                className={twMerge(
                  "w-full rounded-[12px] border border-[#1A1C28] bg-[#13141D] font-medium duration-150 ease-in hover:brightness-125",
                  roundItem.status === STATUS_ROUND.EXPIRED && "brightness-75",
                  isActive && "border border-[#E8E9EE]",
                )}
              >
                <CardHeader roundItem={roundItem}></CardHeader>
                <CardContent roundItem={roundItem} />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="cursor-pointer hover:brightness-125"
        onClick={() => swiper.slideTo(swiper.activeIndex - 1, 0)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.7501 19.2071C16.1406 18.8166 16.1406 18.1834 15.7501 17.7929L9.95718 12L15.7501 6.20711C16.1406 5.81658 16.1406 5.18342 15.7501 4.79289C15.3596 4.40237 14.7264 4.40237 14.3359 4.79289L8.54297 10.5858C7.76192 11.3668 7.76192 12.6332 8.54297 13.4142L14.3359 19.2071C14.7264 19.5976 15.3596 19.5976 15.7501 19.2071Z"
            fill="#E8E9EE"
          />
        </svg>
      </div>
      <div
        className="cursor-pointer hover:brightness-125"
        onClick={() => swiper.slideTo(swiper.activeIndex + 1, 0)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.24992 4.7929C7.8594 5.18342 7.8594 5.81658 8.24992 6.20711L14.0428 12L8.24992 17.7929C7.8594 18.1834 7.8594 18.8166 8.24992 19.2071C8.64045 19.5976 9.27361 19.5976 9.66413 19.2071L15.457 13.4142C16.2381 12.6332 16.2381 11.3668 15.457 10.5858L9.66414 4.7929C9.27361 4.40237 8.64045 4.40237 8.24992 4.7929Z"
            fill="#E8E9EE"
          />
        </svg>
      </div>
    </>
  )
}

export default SwiperList

export const CardHeader = ({ roundItem }: { roundItem: any }) => {
  const { status, round } = roundItem
  const { Icon, text, titleTextClass } = HeaderByStatus[status]

  return (
    <div className="flex h-10 items-center justify-between gap-2 rounded-t-[12px] bg-[#1A1C28] px-4 py-3 text-[12px] font-medium text-[#FCFCFC]">
      <div className="flex items-center">
        {Icon}
        <span className={twMerge("ml-1", titleTextClass)}>{text}</span>
      </div>
      <div className="text-[#585A6B]">#{round}</div>
    </div>
  )
}

export const CardContent = ({ roundItem }: { roundItem: any }) => {
  switch (roundItem.status) {
    case STATUS_ROUND.EXPIRED:
      return <ExpireCardContent roundItem={roundItem} />
    case STATUS_ROUND.LIVE:
      return <LiveCardContent roundItem={roundItem} />
    case STATUS_ROUND.NEXT:
      return <NextCardContent roundItem={roundItem} />
    case STATUS_ROUND.CALCULATING:
      return <CalculatingCardContent roundItem={roundItem} />
    case STATUS_ROUND.LATER:
      return <LaterCardContent roundItem={roundItem} />
  }
}

export const LiveCardContent = ({ roundItem }: { roundItem: any }) => {
  const { round, selectedBet } = roundItem
  const isBeingDown = round % 2

  return (
    <div className="rounded-b-[12px] border border-[#1A1C28] bg-[#13141D] p-4">
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
            "absolute right-0 top-0 flex h-5 -translate-y-1/2 items-center rounded-sm border border-[#080A14] bg-[#E4775D] p-[6px] text-[12px] text-[#080A14] shadow shadow-[#rgba(0,_0,_0,_0.16)]",
            selectedBet === BET_TYPE.DOWN && "top-full -translate-y-1/2",
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
          {selectedBet === BET_TYPE.DOWN ? "DOWN ENTERED" : "UP ENTERED"}
        </div>
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

export const LaterCardContent = ({ roundItem }: { roundItem: any }) => {
  const { selectedBet } = roundItem

  const { timeRemaining, start, end, isStarted } = useCountdown({
    startTime: Math.floor(new Date(1733247924000).getTime()),
    endTime: Math.floor(new Date(1733251524000).getTime()),
    // startTime: Math.floor(Date.now() / 1000),
    // endTime: Math.floor(new Date(1733247924000).getTime() / 1000),
    onStart: () => console.log("started"),
    onEnd: () => console.log("ended"),
  })

  console.log("first", { timeRemaining, start, end, isStarted })

  const { minutes, seconds } = formatCountdownTime(timeRemaining)

  return (
    <div className="rounded-b-[12px] border border-[#1A1C28] bg-[#13141D] p-4">
      {![BET_TYPE.DOWN, BET_TYPE.UP].includes(selectedBet) ? (
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CalculatingCardContent = ({ roundItem }: { roundItem: any }) => {
  return (
    <div className="rounded-b-[12px] border border-[#1A1C28] bg-[#13141D] p-4">
      <div
        className={
          "mb-4 flex h-[260px] flex-col items-center justify-center rounded-lg bg-[#080A14] p-4"
        }
      >
        <img
          src={starIcon}
          alt="starImg"
          className="animate-infinite animate-delay-200 h-8 w-8 animate-spin"
        />
        <span className="mt-4 text-[16px] font-medium uppercase text-[#E8E9EE]">
          Calculating
        </span>
        <span className="mt-2 text-center text-[13px] font-medium text-[#585A6B]">
          Transaction submitted to the
          <br />
          blockchain, awaiting confirmation
        </span>
      </div>
    </div>
  )
}

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

export enum STATUS_ROUND {
  EXPIRED,
  LIVE,
  NEXT,
  CALCULATING,
  LATER,
}

export enum BET_TYPE {
  UP,
  DOWN,
  DRAW,
}

export const LIST_MOCKED = [
  {
    round: 1,
    status: STATUS_ROUND.EXPIRED,
    isEntered: false,
    isCalculating: false,
    result: BET_TYPE.UP,
  },
  {
    round: 2,
    status: STATUS_ROUND.EXPIRED,
    isEntered: true,
    isCalculating: false,
    selectedBet: BET_TYPE.UP,
    result: BET_TYPE.DOWN,
  },
  {
    round: 31,
    status: STATUS_ROUND.EXPIRED,
    isEntered: true,
    isCalculating: false,
    selectedBet: BET_TYPE.DOWN,
    result: BET_TYPE.DRAW,
    isWin: true,
  },
  {
    round: 3,
    status: STATUS_ROUND.EXPIRED,
    isEntered: true,
    isCalculating: false,
    selectedBet: BET_TYPE.DOWN,
    result: BET_TYPE.DOWN,
    isWin: true,
  },
  {
    round: 4,
    status: STATUS_ROUND.EXPIRED,
    isEntered: false,
    isCalculating: false,
    result: BET_TYPE.UP,
  },
  {
    round: 5,
    status: STATUS_ROUND.CALCULATING,
    isEntered: false,
    isCalculating: false,
  },
  {
    round: 6,
    status: STATUS_ROUND.LIVE,
    isEntered: false,
    isCalculating: false,
  },
  {
    round: 7,
    status: STATUS_ROUND.LIVE,
    isEntered: true,
    selectedBet: BET_TYPE.DOWN,
    isCalculating: false,
  },
  {
    round: 8,
    status: STATUS_ROUND.NEXT,
    isEntered: false,
    isCalculating: false,
  },
  {
    round: 9,
    status: STATUS_ROUND.NEXT,
    isEntered: true,
    selectedBet: BET_TYPE.UP,
    isCalculating: false,
  },
  {
    round: 10,
    status: STATUS_ROUND.NEXT,
    isEntered: true,
    selectedBet: BET_TYPE.DOWN,
    isCalculating: false,
  },
  {
    round: 11,
    status: STATUS_ROUND.LATER,
    isEntered: false,
    isCalculating: false,
  },
  {
    round: 12,
    status: STATUS_ROUND.LATER,
    isEntered: false,
    isCalculating: false,
  },
]

const HeaderByStatus: any = {
  [STATUS_ROUND.EXPIRED]: {
    text: "EXPIRED",
    titleTextClass: "text-[#585A6B] ml-1",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M8.05273 15.0527C7.2207 15.0527 6.43945 14.8945 5.70898 14.5781C4.97852 14.2656 4.33398 13.8301 3.77539 13.2715C3.2207 12.7168 2.78516 12.0742 2.46875 11.3438C2.15625 10.6133 2 9.83203 2 9C2 8.27734 2.12305 7.5918 2.36914 6.94336C2.61914 6.29102 2.95898 5.70312 3.38867 5.17969C3.51758 5.01172 3.66992 4.91992 3.8457 4.9043C4.02539 4.88867 4.17578 4.94336 4.29688 5.06836C4.42188 5.18945 4.47852 5.32617 4.4668 5.47852C4.45898 5.63086 4.40234 5.78125 4.29688 5.92969C3.95312 6.34766 3.68359 6.81836 3.48828 7.3418C3.29688 7.86523 3.19922 8.41797 3.19531 9C3.19531 9.67188 3.32031 10.3027 3.57031 10.8926C3.82031 11.4785 4.16602 11.9941 4.60742 12.4395C5.05273 12.8809 5.56836 13.2266 6.1543 13.4766C6.74414 13.7305 7.37695 13.8574 8.05273 13.8574C8.72852 13.8574 9.35938 13.7305 9.94531 13.4766C10.5352 13.2266 11.0508 12.8809 11.4922 12.4395C11.9375 11.9941 12.2832 11.4785 12.5293 10.8926C12.7793 10.3027 12.9043 9.67188 12.9043 9C12.9043 8.32031 12.7773 7.68359 12.5234 7.08984C12.2734 6.49609 11.9238 5.97656 11.4746 5.53125C11.0254 5.08594 10.5039 4.74023 9.91016 4.49414C9.31641 4.24414 8.67773 4.12305 7.99414 4.13086L8.50391 3.48047V5.67188C8.50391 5.82031 8.45703 5.94531 8.36328 6.04688C8.26953 6.14844 8.14844 6.19922 8 6.19922C7.85547 6.19922 7.73633 6.14844 7.64258 6.04688C7.54883 5.94531 7.50195 5.82031 7.50195 5.67188V3.50977C7.50195 3.33398 7.54883 3.19727 7.64258 3.09961C7.74023 2.99805 7.87891 2.94727 8.05859 2.94727C8.89062 2.94727 9.67188 3.10547 10.4023 3.42188C11.1328 3.73438 11.7754 4.16992 12.3301 4.72852C12.8848 5.2832 13.3203 5.92578 13.6367 6.65625C13.9531 7.38672 14.1113 8.16797 14.1113 9C14.1113 9.83203 13.9531 10.6133 13.6367 11.3438C13.3203 12.0742 12.8828 12.7168 12.3242 13.2715C11.7695 13.8301 11.127 14.2656 10.3965 14.5781C9.66602 14.8945 8.88477 15.0527 8.05273 15.0527ZM8.05273 9.98438C7.87305 9.98438 7.70898 9.93945 7.56055 9.84961C7.41211 9.75977 7.28906 9.63867 7.19141 9.48633L5.35156 6.69141C5.27734 6.57422 5.25586 6.4668 5.28711 6.36914C5.32227 6.27148 5.38867 6.20508 5.48633 6.16992C5.58398 6.13477 5.68945 6.1582 5.80273 6.24023L8.60938 8.17969C8.74219 8.27344 8.84766 8.39258 8.92578 8.53711C9.00781 8.67773 9.04883 8.83203 9.04883 9C9.04883 9.27344 8.95117 9.50586 8.75586 9.69727C8.56055 9.88867 8.32617 9.98438 8.05273 9.98438Z"
          fill="#585A6B"
        />
      </svg>
    ),
  },
  [STATUS_ROUND.LIVE]: {
    text: "LIVE",
    titleTextClass: "text-[#FCFCFC] ml-1",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M2.74219 11.4756C2.2474 11.4756 2 11.2282 2 10.7334V6.73926C2 6.24772 2.2474 6.00195 2.74219 6.00195C3.24023 6.00195 3.48926 6.24772 3.48926 6.73926V10.7334C3.48926 11.2282 3.24023 11.4756 2.74219 11.4756ZM5.4668 10.2061C4.97201 10.2061 4.72461 9.95866 4.72461 9.46387V8.00879C4.72461 7.514 4.97201 7.2666 5.4668 7.2666C5.96159 7.2666 6.20898 7.514 6.20898 8.00879V9.46387C6.20898 9.95866 5.96159 10.2061 5.4668 10.2061ZM8.18652 13.4727C7.69173 13.4727 7.44434 13.2253 7.44434 12.7305V4.74707C7.44434 4.24902 7.69173 4 8.18652 4C8.68131 4 8.92871 4.24902 8.92871 4.74707V12.7305C8.92871 13.2253 8.68131 13.4727 8.18652 13.4727ZM10.9062 10.2061C10.4147 10.2061 10.1689 9.95866 10.1689 9.46387V8.00879C10.1689 7.514 10.4147 7.2666 10.9062 7.2666C11.401 7.2666 11.6484 7.514 11.6484 8.00879V9.46387C11.6484 9.95866 11.401 10.2061 10.9062 10.2061ZM13.6309 11.4756C13.1361 11.4756 12.8887 11.2282 12.8887 10.7334V6.73926C12.8887 6.24772 13.1361 6.00195 13.6309 6.00195C14.1257 6.00195 14.373 6.24772 14.373 6.73926V10.7334C14.373 11.2282 14.1257 11.4756 13.6309 11.4756Z"
          fill="#FCFCFC"
        />
      </svg>
    ),
  },
  [STATUS_ROUND.NEXT]: {
    text: "NEXT",
    titleTextClass: "text-[#FCFCFC] ml-1",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M4 13.0664V4.93359C4 4.64062 4.07227 4.42578 4.2168 4.28906C4.36133 4.14844 4.5332 4.07812 4.73242 4.07812C4.9082 4.07812 5.08789 4.12891 5.27148 4.23047L12.0977 8.2207C12.3398 8.36133 12.5078 8.48828 12.6016 8.60156C12.6992 8.71094 12.748 8.84375 12.748 9C12.748 9.15234 12.6992 9.28516 12.6016 9.39844C12.5078 9.51172 12.3398 9.63867 12.0977 9.7793L5.27148 13.7695C5.08789 13.8711 4.9082 13.9219 4.73242 13.9219C4.5332 13.9219 4.36133 13.8516 4.2168 13.7109C4.07227 13.5703 4 13.3555 4 13.0664Z"
          fill="#FCFCFC"
        />
      </svg>
    ),
  },
  [STATUS_ROUND.CALCULATING]: {
    text: "CALCULATING",
    titleTextClass: "text-[#FCFCFC] ml-1",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M4.45186 8.7703C4.29651 8.7703 4.16628 8.71775 4.06119 8.61266C3.9561 8.50757 3.90355 8.37735 3.90355 8.22199C3.90355 8.06664 3.9561 7.9387 4.06119 7.83817C4.16628 7.73308 4.29651 7.68053 4.45186 7.68053H7.36477V3.73269C7.36477 3.58191 7.41731 3.45397 7.52241 3.34887C7.6275 3.24378 7.75544 3.19123 7.90622 3.19123C8.06158 3.19123 8.1918 3.24378 8.29689 3.34887C8.40199 3.45397 8.45453 3.58191 8.45453 3.73269V8.22199C8.45453 8.37735 8.40199 8.50757 8.29689 8.61266C8.1918 8.71775 8.06158 8.7703 7.90622 8.7703H4.45186ZM7.91308 14.9936C6.93526 14.9936 6.01912 14.8086 5.16467 14.4385C4.31021 14.0729 3.55857 13.5657 2.90974 12.9169C2.2609 12.2726 1.75143 11.5233 1.38132 10.6688C1.01578 9.80981 0.833008 8.89139 0.833008 7.91357C0.833008 6.93574 1.01578 6.01961 1.38132 5.16515C1.75143 4.30613 2.2609 3.55221 2.90974 2.90337C3.55857 2.25454 4.31021 1.74735 5.16467 1.38181C6.01912 1.01627 6.93526 0.833496 7.91308 0.833496C8.8909 0.833496 9.80704 1.01627 10.6615 1.38181C11.5205 1.74735 12.2744 2.25454 12.9233 2.90337C13.5721 3.55221 14.0793 4.30613 14.4448 5.16515C14.8149 6.01961 15 6.93574 15 7.91357C15 8.89139 14.8149 9.80981 14.4448 10.6688C14.0793 11.5233 13.5721 12.2726 12.9233 12.9169C12.2744 13.5657 11.5205 14.0729 10.6615 14.4385C9.80704 14.8086 8.8909 14.9936 7.91308 14.9936ZM7.91308 13.5954C8.69899 13.5954 9.43464 13.4469 10.12 13.1499C10.8054 12.8575 11.4086 12.4508 11.9295 11.9299C12.4549 11.409 12.8639 10.8059 13.1563 10.1205C13.4487 9.43513 13.595 8.69948 13.595 7.91357C13.595 7.12765 13.4487 6.392 13.1563 5.70661C12.8639 5.01665 12.4549 4.41351 11.9295 3.89719C11.4086 3.37629 10.8054 2.96963 10.12 2.67719C9.43464 2.38019 8.69899 2.23169 7.91308 2.23169C7.13173 2.23169 6.39608 2.38019 5.70612 2.67719C5.02073 2.96963 4.41759 3.37629 3.8967 3.89719C3.3758 4.41351 2.96685 5.01665 2.66985 5.70661C2.37742 6.392 2.2312 7.12765 2.2312 7.91357C2.2312 8.69948 2.37742 9.43513 2.66985 10.1205C2.96685 10.8059 3.3758 11.409 3.8967 11.9299C4.41759 12.4508 5.02073 12.8575 5.70612 13.1499C6.39608 13.4469 7.13173 13.5954 7.91308 13.5954Z"
          fill="#FCFCFC"
        />
      </svg>
    ),
  },
  [STATUS_ROUND.LATER]: {
    text: "LATER",
    titleTextClass: "text-[#585A6B] ml-1",
    Icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M6 3.58273C5.85252 3.58273 5.72482 3.53058 5.61691 3.42626C5.51259 3.31835 5.46043 3.19065 5.46043 3.04317V0.539568C5.46043 0.395683 5.51259 0.269784 5.61691 0.161871C5.72482 0.0539568 5.85252 0 6 0C6.14748 0 6.27338 0.0539568 6.3777 0.161871C6.48561 0.269784 6.53957 0.395683 6.53957 0.539568V3.04317C6.53957 3.19065 6.48561 3.31835 6.3777 3.42626C6.27338 3.53058 6.14748 3.58273 6 3.58273ZM7.70504 4.29496C7.60072 4.18705 7.54856 4.05755 7.54856 3.90647C7.54856 3.7554 7.60072 3.6277 7.70504 3.52338L9.47482 1.75899C9.57914 1.65468 9.70683 1.60252 9.85791 1.60252C10.009 1.60252 10.1367 1.65468 10.241 1.75899C10.3453 1.86331 10.3975 1.99101 10.3975 2.14209C10.3975 2.29317 10.3453 2.42086 10.241 2.52518L8.47662 4.29496C8.3759 4.39928 8.2482 4.45324 8.09352 4.45683C7.94245 4.45683 7.81295 4.40288 7.70504 4.29496ZM8.41187 6C8.41187 5.84892 8.46583 5.72122 8.57374 5.61691C8.68525 5.51259 8.81475 5.46043 8.96223 5.46043H11.4604C11.6043 5.46043 11.7302 5.51259 11.8381 5.61691C11.946 5.72122 12 5.84892 12 6C12 6.15108 11.946 6.27878 11.8381 6.38309C11.7338 6.48741 11.6079 6.53957 11.4604 6.53957H8.96223C8.81475 6.53957 8.68525 6.48741 8.57374 6.38309C8.46583 6.27878 8.41187 6.15108 8.41187 6ZM7.70504 7.70504C7.81295 7.60072 7.94245 7.54856 8.09352 7.54856C8.2446 7.54856 8.3723 7.60072 8.47662 7.70504L10.241 9.47482C10.3453 9.57914 10.3975 9.70683 10.3975 9.85791C10.3975 10.009 10.3453 10.1367 10.241 10.241C10.1367 10.3453 10.009 10.3975 9.85791 10.3975C9.70683 10.3975 9.57914 10.3453 9.47482 10.241L7.70504 8.47662C7.60072 8.3723 7.54856 8.2446 7.54856 8.09352C7.54856 7.94245 7.60072 7.81295 7.70504 7.70504ZM6 8.41727C6.14748 8.41727 6.27338 8.47122 6.3777 8.57914C6.48561 8.68705 6.53957 8.81295 6.53957 8.95683V11.4604C6.53957 11.6043 6.48561 11.7302 6.3777 11.8381C6.27338 11.946 6.14748 12 6 12C5.85252 12 5.72482 11.946 5.61691 11.8381C5.51259 11.7302 5.46043 11.6043 5.46043 11.4604V8.95683C5.46043 8.81295 5.51259 8.68705 5.61691 8.57914C5.72482 8.47122 5.85252 8.41727 6 8.41727ZM4.29496 7.70504C4.40288 7.81295 4.45504 7.94245 4.45144 8.09352C4.45144 8.2446 4.39928 8.3723 4.29496 8.47662L2.52518 10.241C2.42086 10.3453 2.29317 10.3975 2.14209 10.3975C1.99101 10.3975 1.86331 10.3453 1.75899 10.241C1.65468 10.1367 1.60252 10.009 1.60252 9.85791C1.60252 9.70683 1.65468 9.57914 1.75899 9.47482L3.52338 7.70504C3.6277 7.60072 3.7554 7.54856 3.90647 7.54856C4.05755 7.54856 4.18705 7.60072 4.29496 7.70504ZM3.58813 6C3.58813 6.15108 3.53237 6.27878 3.42086 6.38309C3.31295 6.48741 3.18705 6.53957 3.04317 6.53957H0.539568C0.395683 6.53957 0.269784 6.48741 0.161871 6.38309C0.0539568 6.27878 0 6.15108 0 6C0 5.84892 0.0539568 5.72122 0.161871 5.61691C0.269784 5.51259 0.395683 5.46043 0.539568 5.46043H3.04317C3.18705 5.46043 3.31295 5.51259 3.42086 5.61691C3.53237 5.72122 3.58813 5.84892 3.58813 6ZM4.29496 4.29496C4.18705 4.40288 4.05755 4.45683 3.90647 4.45683C3.7554 4.45324 3.6277 4.39928 3.52338 4.29496L1.75899 2.52518C1.65468 2.42086 1.60252 2.29317 1.60252 2.14209C1.60252 1.99101 1.65468 1.86331 1.75899 1.75899C1.86331 1.65468 1.99101 1.60252 2.14209 1.60252C2.29317 1.60252 2.42086 1.65468 2.52518 1.75899L4.29496 3.52338C4.39928 3.6277 4.45144 3.7554 4.45144 3.90647C4.45144 4.05755 4.39928 4.18705 4.29496 4.29496Z"
          fill="#585A6B"
        />
      </svg>
    ),
  },
}
