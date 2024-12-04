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
import { ArrowsLeftIcon, ArrowsRightIcon } from "@components/Icons/Arrow"

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

      <div className="flex items-center justify-center gap-2">
        <div
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border-1 border-white bg-mercury-950 hover:brightness-125"
          onClick={() => swiper.slideTo(swiper.activeIndex - 1, 0)}
        >
          <ArrowsLeftIcon />
        </div>
        <div
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border-1 border-white bg-mercury-950 hover:brightness-125"
          onClick={() => swiper.slideTo(swiper.activeIndex + 1, 0)}
        >
          <ArrowsRightIcon />
        </div>
      </div>
    </>
  )
}

export default SwiperList
