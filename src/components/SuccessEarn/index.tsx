import { xDSTL } from "@assets/images"
import { successEarn } from "@assets/lotties"
import { CircleCheckFilled } from "@components/Icons"
import { Image } from "@nextui-org/react"
import Lottie from "lottie-react"
import React from "react"

const SuccessEarn: React.FC<{
  title: string
  point: number
}> = ({ title, point }) => {
  return (
    <>
      <div className="absolute left-[-30px] top-[-50px] z-[-2] h-[150px] w-[300px]">
        <Lottie animationData={successEarn} />
      </div>
      <div className="absolute left-0 top-0 z-[-1] h-full w-full rounded-[22px] bg-mercury-30"></div>
      <div className="relative z-10 rounded-[22px] px-4 pb-2 pt-3 text-center">
        <div className="flex items-center gap-1">
          <CircleCheckFilled />
          <span className="whitespace-nowrap text-14 font-bold text-green-500">
            Objective Completed
          </span>
        </div>
        <p className="mt-1 text-14 text-mercury-700">{title}</p>
        <div className="mt-1 flex items-center justify-center gap-2">
          <Image className="w-8" src={xDSTL} />
          <span className="text-20 font-semibold">+{point}</span>
        </div>
      </div>
    </>
  )
}

export default SuccessEarn
