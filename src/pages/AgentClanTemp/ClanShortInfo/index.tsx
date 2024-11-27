import { xDSTL, xpIcon } from "@assets/images"
import { BoltIcon, TrophyIcon } from "@components/Icons"
import { ArrowRightIcon } from "@components/Icons/Arrow"
import { Image } from "@nextui-org/react"
import React from "react"

const ClanShortInfo: React.FC = () => {
  return (
    <div className="w-full pb-1">
      <div className="flex w-full items-center rounded-full bg-mercury-30 px-4 py-[10px]">
        <div className="relative flex w-full items-center justify-between">
          <div className="absolute left-1/2 h-[26px] w-[1px] -translate-x-1/2 bg-mercury-200"></div>
          <div className="flex w-[calc(50%-15px)] items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <p className="text-14 text-mercury-900">Rewards</p>
              <div className="flex items-center gap-1">
                <Image src={xDSTL} alt="xdstl" />
                <span className="text-14 font-bold text-mercury-950">100</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <BoltIcon />
              <span className="text-14">2 days left</span>
            </div>
          </div>
          <div className="flex w-[calc(50%-15px)] items-center justify-between">
            <span className="text-14 text-mercury-900">Your EXP</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <TrophyIcon />
                <span className="text-14 font-bold text-mercury-950">
                  286th
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Image src={xpIcon} alt="xp" />
                <span className="text-14 font-bold text-mercury-950">64</span>
              </div>
              <div className="-mr-1 cursor-pointer hover:opacity-70">
                <ArrowRightIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClanShortInfo
