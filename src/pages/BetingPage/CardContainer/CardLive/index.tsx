import { CheckFilledIcon } from "@components/Icons/DefiLens"
import { twMerge } from "tailwind-merge"
import TimeProgress from "../TimeProgress"
import { Divider } from "@nextui-org/react"
import LiveCardPrice from "./LivePrice"

const CardLiveBet = ({ roundItem }: { roundItem: any }) => {
  return (
    <div className="rounded-b-[12px] border border-[#1A1C28] bg-[#13141D] p-4">
      <div
        className={twMerge(
          "absolute left-1/2 top-0 flex h-5 -translate-x-1/2 -translate-y-1/2 items-center rounded-sm border border-[#080A14] bg-[#E4775D] p-[6px] text-[12px] text-[#080A14] shadow shadow-[#rgba(0,_0,_0,_0.16)]",
        )}
      >
        <CheckFilledIcon size={12} color="#080A14" />
        <span className="ml-1">ENTERED</span>
      </div>
      <TimeProgress />
      <LiveCardPrice />
      <div className="mt-6 flex flex-col">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-[#9192A0]">Your position</span>
          <span className="text-[#E8E9EE]">-- MAX</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[12px]">
          <span className="text-[#9192A0]">Your prediction</span>
          <span className="text-[#9FF4CF]">UP</span>
        </div>
        <Divider className="my-3 bg-[#30344A]" />
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

export default CardLiveBet
