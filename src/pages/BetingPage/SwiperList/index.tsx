import { useEffect, useState } from "react"

import useSwiper from "@hooks/useSwiper"
import delay from "lodash/delay"
import {
  FreeMode,
  Keyboard,
  Mousewheel,
  //   Pagination,
  Virtual,
} from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import CardContainer, { BET_TYPE, STATUS_ROUND } from "../CardContainer"
import ModalBet from "../ModalBet"

export const CHART_DOT_CLICK_EVENT = "CHART_DOT_CLICK_EVENT"

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

const SwiperList = () => {
  const { setSwiper, swiper } = useSwiper()
  const [showBetModal, setShowBetModal] = useState(false)
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
      <ModalBet
        isOpen={showBetModal}
        closeModal={() => setShowBetModal(false)}
      ></ModalBet>
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
            {({ isActive }) => (
              <CardContainer
                roundItem={roundItem}
                isActive={isActive}
                onClick={() =>
                  roundItem.status === STATUS_ROUND.NEXT &&
                  setShowBetModal(true)
                }
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="= cursor-pointer hover:brightness-125"
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
