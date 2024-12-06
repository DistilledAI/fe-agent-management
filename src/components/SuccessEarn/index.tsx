import { xDSTL } from "@assets/images"
import { successEarn } from "@assets/lotties"
import { CircleCheckFilled } from "@components/Icons"
import Lottie from "lottie-react"
import React from "react"

const SuccessEarn: React.FC<{
  title: string
  point: number
}> = ({ title, point }) => {
  return (
    <>
      <div className="absolute left-1/2 top-[-50px] z-0 h-[258px] w-[258px] -translate-x-1/2">
        <Lottie animationData={successEarn} />
      </div>
      <div className="shadow-10 absolute inset-0 z-[1] h-full w-full rounded-[22px] bg-white" />
      <div className="shadow-10 absolute inset-0 z-10 rounded-[22px] border border-white bg-[#F4F4F5CC] px-4 pb-2 pt-3 text-center">
        <div className="flex items-center justify-center gap-1">
          <div>
            <CircleCheckFilled />
          </div>
          <span className="whitespace-nowrap text-14 font-bold text-green-500">
            Objective Completed
          </span>
        </div>
        <h5 className="mt-[2px] line-clamp-1 text-14 text-mercury-700">
          {title}
        </h5>
        <div className="mt-1 flex items-center justify-center gap-2">
          <img className="h-8 w-8" src={xDSTL} alt="xDSTL" />
          <span className="text-20 font-semibold text-mercury-950">
            +{point}
          </span>
        </div>
      </div>
    </>
  )
}

export default SuccessEarn
