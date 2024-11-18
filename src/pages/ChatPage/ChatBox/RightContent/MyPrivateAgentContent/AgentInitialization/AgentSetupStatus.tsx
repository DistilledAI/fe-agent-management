import { twMerge } from "tailwind-merge"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { Spinner } from "@nextui-org/react"
import { CheckFilledIcon } from "@components/Icons/DefiLens"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { DatabaseIcon } from "@components/Icons/DatabaseImportIcon"
import { FilledShieldCheckedIcon } from "@components/Icons/FilledShieldCheck"
import { borderGdImg } from "@assets/images"

interface AgentSetupStatusProps {
  isBotActive: boolean
}

const AgentSetupStatus = ({ isBotActive }: AgentSetupStatusProps) => {
  return (
    <div className="relative mx-auto mb-4 flex max-w-[684px] items-center justify-between md:mb-6">
      {/* Agent Status */}
      <div className="flex flex-1 flex-col items-center gap-1">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#FC0] md:h-10 md:w-10">
          <FilledBrainAIIcon color="#363636" size={24} />
          <div
            className={twMerge(
              "absolute -bottom-1 -right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white shadow-8",
              isBotActive && "bg-green-500",
            )}
          >
            {!isBotActive ? (
              <Spinner
                classNames={{
                  wrapper: "w-3 h-3",
                  circle1: "border-[#E7E0D7] border-b-brown-500",
                  circle2: "border-b-brown-500",
                }}
              />
            ) : (
              <CheckFilledIcon color="white" size={12} />
            )}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-14 font-semibold text-mercury-950 md:text-18">
            Creating your
          </span>
          <span className="text-14 font-semibold text-mercury-950 md:text-18">
            Private Agent...
          </span>
        </div>
      </div>

      {/* Chevron Divider */}
      <div className="absolute left-1/2 top-4 w-full max-w-[150px] -translate-x-1/2 md:max-w-[280px]">
        <img src={borderGdImg} alt="border gradient" />
        <div className="absolute -top-[9px] left-1/2">
          <div className="rotate-90">
            <ChevronDownIcon color="#9D936E" size={22} />
          </div>
        </div>
      </div>

      {/* Database Connection Status */}
      <div className="flex flex-1 flex-col items-center gap-1">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-mercury-200 md:h-10 md:w-10">
          <DatabaseIcon color="#363636" size={24} />
          <div className="absolute -bottom-1 -right-1">
            <FilledShieldCheckedIcon color="#A2845E" />
          </div>
        </div>
        <p className="max-w-[227px] text-14 font-semibold text-mercury-950 max-md:text-center md:text-18">
          Connect anything you want the Private Agent to learn
        </p>
      </div>
    </div>
  )
}

export default AgentSetupStatus
