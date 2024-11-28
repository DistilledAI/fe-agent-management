import {
  objectiveCategory,
  objectiveCategoryActive,
  objectiveCategoryAI,
  objectiveCategoryAIActive,
  objectiveCategoryClan,
  objectiveCategoryClanActive,
} from "@assets/images"
import { Indicator } from "@components/Icons/Indicator"
import { TargetArrowIcon } from "@components/Icons/RewardsIcons"
import { useState } from "react"
import AutonomousAIAgent from "./AutonomousAIAgent"
import GrowClan from "./GrowClan"
import WelcomeOnboard from "./WelcomeOnboard"

const Objectives: React.FC<{
  listActionTaskSuccess: any[]
  callGetTaskSuccess: any
}> = ({ listActionTaskSuccess, callGetTaskSuccess }) => {
  const [activeKey, setActiveKey] = useState<string>("WELCOME_ONBOARD")

  const OBJECTIVES_LIST = [
    {
      label: "Welcome Onboard!",
      defaultBg: objectiveCategory,
      activeBg: objectiveCategoryActive,
      key: "WELCOME_ONBOARD",
      totalObjectives: 4,
    },
    {
      label: "Autonomous AI Agents are just the beginning.",
      defaultBg: objectiveCategoryAI,
      activeBg: objectiveCategoryAIActive,
      key: "AUTONOMOUS",
      totalObjectives: 4,
    },
    {
      label: "Grow the Clan together!",
      defaultBg: objectiveCategoryClan,
      activeBg: objectiveCategoryClanActive,
      key: "CLAN",
      totalObjectives: 1,
    },
  ]

  const renderOBjectiveRightContent = () => {
    switch (activeKey) {
      case "WELCOME_ONBOARD":
        return (
          <WelcomeOnboard
            listActionTaskSuccess={listActionTaskSuccess}
            callGetTaskSuccess={callGetTaskSuccess}
          />
        )
      case "AUTONOMOUS":
        return (
          <AutonomousAIAgent listActionTaskSuccess={listActionTaskSuccess} />
        )

      default:
        return <GrowClan />
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <TargetArrowIcon />
        <span className="text-22 font-bold text-mercury-950">Objectives</span>
      </div>
      <div className="mt-6 flex gap-3">
        <div>
          {OBJECTIVES_LIST.map((objective) => {
            const isObjectiveActive = activeKey === objective.key
            const imageSrc = isObjectiveActive
              ? objective.activeBg
              : objective.defaultBg

            return (
              <div
                className="relative w-[220px] cursor-pointer py-2"
                onClick={() => setActiveKey(objective.key)}
              >
                <img className="w-full" src={imageSrc} />
                {isObjectiveActive && (
                  <div className="absolute -right-[26px] top-1/2 -translate-y-1/2">
                    <Indicator />
                  </div>
                )}
                <span
                  aria-selected={isObjectiveActive}
                  className="text-base-sb absolute left-4 top-6 aria-selected:text-white"
                >
                  {objective.label}
                </span>

                <div
                  className="outline-3 absolute bottom-6 left-4 flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-white bg-[rgba(0,0,0,0.15)] outline outline-[rgba(0,0,0,0.15)] backdrop-blur-sm aria-selected:border-[#656865]"
                  aria-selected={isObjectiveActive}
                >
                  <span className="text-14 text-white">
                    {objective.totalObjectives}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
        {renderOBjectiveRightContent()}
      </div>
    </>
  )
}
export default Objectives
