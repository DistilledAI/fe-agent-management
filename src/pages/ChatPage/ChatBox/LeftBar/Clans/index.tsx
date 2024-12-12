import React, { useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import ClanItem from "./ClanItem"
import { ArrowRightIcon, ArrowsLeftIcon } from "@components/Icons/Arrow"
import { twMerge } from "tailwind-merge"
import { Link } from "react-router-dom"
import { PATH_NAMES } from "@constants/index"
import useFetchClan from "@pages/Marketplace/useFetchClan"

const ChatClans: React.FC = () => {
  const prevRef = useRef<any>(null)
  const nextRef = useRef<any>(null)
  const [isFirstSlide, setIsFirstSlide] = useState(true)
  const [isLastSlide, setIsLastSlide] = useState(false)
  const { data } = useFetchClan()

  const handleSlideChange = (s: any) => {
    setIsFirstSlide(s.isBeginning)
    setIsLastSlide(s.isEnd)
  }

  return (
    <div className="mt-5">
      <div>
        <p className="mb-2 px-2 text-14 text-[#11181c]">Clan</p>
      </div>
      <div className="relative">
        <Swiper
          onSlideChange={handleSlideChange}
          spaceBetween={10}
          slidesPerView={4}
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
        >
          {data.map((group) => (
            <SwiperSlide key={group.id} className="py-1">
              <ClanItem group={group} />
            </SwiperSlide>
          ))}
          <SwiperSlide key="last-all" className="py-1">
            <Link
              to={PATH_NAMES.MARKETPLACE}
              className="flex w-[60px] cursor-pointer items-center justify-center rounded-lg bg-mercury-200 px-1 py-4 duration-400 hover:opacity-80"
            >
              <span className="text-center text-13 font-semibold text-mercury-950">
                Show all clans
              </span>
            </Link>
          </SwiperSlide>
        </Swiper>
        <div
          ref={prevRef}
          className={twMerge(
            "absolute left-[-5px] top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(84,84,84,0.1)] backdrop-blur-[10px] duration-300",
            isFirstSlide && "invisible",
          )}
        >
          <ArrowsLeftIcon size={20} color="#676767" />
        </div>
        <div
          ref={nextRef}
          className={twMerge(
            "absolute right-[-5px] top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(84,84,84,0.1)] backdrop-blur-[10px] duration-300",
            isLastSlide && "invisible",
          )}
        >
          <ArrowRightIcon size={20} color="#676767" />
        </div>
      </div>
    </div>
  )
}

export default ChatClans
