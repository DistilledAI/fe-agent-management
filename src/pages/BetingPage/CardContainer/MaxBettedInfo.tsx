import { bitmaxAva } from "@assets/images"
import { Tooltip } from "@nextui-org/react"
import React from "react"
import { BET_TYPE } from "."

const MaxBettedInfo: React.FC<{
  betType: BET_TYPE
}> = ({ betType }) => {
  return (
    <Tooltip
      content={
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M5.41406 12.25H10.1172C10.5465 12.25 10.8992 11.9875 11.0523 11.6102L12.6137 7.90781C12.6602 7.7875 12.6848 7.66172 12.6848 7.525V6.46953C12.6848 5.89258 12.2199 5.25 11.6512 5.25H8.3918L8.88398 3.02148L8.90039 2.85742C8.90039 2.64141 8.81289 2.44453 8.67344 2.30234L8.12109 1.75L4.67578 5.23086C4.48984 5.41953 4.375 5.68203 4.375 5.97188V11.2219C4.375 11.7988 4.84531 12.25 5.41406 12.25Z"
              fill="#E8E9EE"
            />
            <path d="M1.3125 6.125H3.0625V12.25H1.3125V6.125Z" fill="#E8E9EE" />
          </svg>
          <span className="text-12 font-medium text-[#F7F7F7]">
            MAX’s bet{" "}
            {betType === BET_TYPE.DOWN ? (
              <span className="text-[#E75787]">DOWN</span>
            ) : (
              <span className="text-[#9FF4CF]">UP</span>
            )}
          </span>
        </div>
      }
      placement="right"
      showArrow
      classNames={{
        content: "bg-[#30344A] p-2",
        base: "before:bg-[#30344A]",
      }}
      offset={40}
    >
      <img className="h-4 w-4 rounded-full bg-white" src={bitmaxAva} />
    </Tooltip>
  )
}

export default MaxBettedInfo
