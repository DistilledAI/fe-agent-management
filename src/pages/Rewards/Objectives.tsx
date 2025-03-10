import {
  objectiveCategory,
  objectiveCategoryActive,
  objectiveCategoryAI,
  objectiveCategoryAIActive,
  objectiveCategoryClan,
  objectiveCategoryClanActive,
  xDSTL,
} from "@assets/images"
import { Indicator } from "@components/Icons/Indicator"
import { TargetArrowIcon } from "@components/Icons/RewardsIcons"
import useWindowSize from "@hooks/useWindowSize"
import { Progress, ScrollShadow } from "@nextui-org/react"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { XDSTL_TASK_KEY } from "."
import AutonomousAIAgent from "./AutonomousAIAgent"
import GrowClan from "./GrowClan"
import WelcomeOnboard from "./WelcomeOnboard"

const Objectives: React.FC<{
  listActionTaskSuccess: any[]
  callGetTaskSuccess: any
  totalxDstlPoint: number
  listTaskSuccess: any[]
}> = ({
  listActionTaskSuccess,
  callGetTaskSuccess,
  totalxDstlPoint,
  listTaskSuccess,
}) => {
  const { isMobile } = useWindowSize()

  const welcomTaskKeys = [
    XDSTL_TASK_KEY.LOGIN,
    XDSTL_TASK_KEY.CONNECT_X,
    XDSTL_TASK_KEY.RETWEET_X,
    XDSTL_TASK_KEY.CHAT_WITH_AGENT,
    XDSTL_TASK_KEY.BUG_REPORT,
  ]

  const autonomousTaskKeys = [
    XDSTL_TASK_KEY.PUBLISH_BOT,
    XDSTL_TASK_KEY.BIND_TELE_FOR_BOT,
    XDSTL_TASK_KEY.BIND_X_FOR_BOT,
    XDSTL_TASK_KEY.TOKENIZE_AGENT,
  ]

  const welcomeTaskDoneCount = listActionTaskSuccess.filter((taskKey) =>
    welcomTaskKeys.includes(taskKey),
  ).length

  const autonomousTaskDoneCount = listActionTaskSuccess.filter((taskKey) =>
    autonomousTaskKeys.includes(taskKey),
  ).length

  const clanTaskDoneCount = listActionTaskSuccess.filter((taskKey) =>
    [XDSTL_TASK_KEY.JOIN_CLAN].includes(taskKey),
  ).length
  const [activeKey, setActiveKey] = useState<string>("WELCOME_ONBOARD")
  const progressValue = Math.round((totalxDstlPoint / 1600) * 100)

  const OBJECTIVES_LIST = [
    {
      label: "Welcome Onboard!",
      defaultBg: objectiveCategory,
      activeBg: objectiveCategoryActive,
      key: "WELCOME_ONBOARD",
      totalObjectives: 5,
      taskDoneCount: welcomeTaskDoneCount,
    },
    {
      label: (
        <span>
          Autonomous AI Agents <br />
          are just the beginning.
        </span>
      ),
      defaultBg: objectiveCategoryAI,
      activeBg: objectiveCategoryAIActive,
      key: "AUTONOMOUS",
      totalObjectives: 4,
      taskDoneCount: autonomousTaskDoneCount,
    },
    {
      label: "Grow the Clan together!",
      defaultBg: objectiveCategoryClan,
      activeBg: objectiveCategoryClanActive,
      key: "CLAN",
      totalObjectives: 1,
      taskDoneCount: clanTaskDoneCount,
    },
  ]

  const renderListObjectives = () => {
    return (
      <div className="max-md:flex max-md:gap-4">
        {OBJECTIVES_LIST.map((objective) => {
          const isObjectiveActive = activeKey === objective.key
          const imageSrc = isObjectiveActive
            ? objective.activeBg
            : objective.defaultBg

          return (
            <div
              className="relative w-[220px] cursor-pointer py-2 max-md:p-0"
              onClick={() => setActiveKey(objective.key)}
              key={objective.key}
            >
              <img className="w-full" src={imageSrc} />
              {isObjectiveActive && (
                <div
                  className={twMerge(
                    isMobile
                      ? "z-100 absolute -bottom-[20px] left-1/2 -translate-x-1/2"
                      : "absolute -right-[30px] top-1/2 -translate-y-1/2 -rotate-90",
                  )}
                >
                  <Indicator />
                </div>
              )}

              <span
                aria-selected={isObjectiveActive}
                className="text-base-sb absolute left-4 top-6 aria-selected:text-white max-md:top-4"
              >
                {objective.label}
              </span>

              <div
                className="outline-3 absolute bottom-6 left-4 flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-white bg-[rgba(0,0,0,0.15)] outline outline-[rgba(0,0,0,0.15)] backdrop-blur-sm aria-selected:border-[#656865] max-md:bottom-4"
                aria-selected={isObjectiveActive}
              >
                <span className="text-14 text-white">
                  {objective.taskDoneCount || 0}/{objective.totalObjectives}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderObjectivesOptions = () => {
    if (isMobile) {
      return (
        <ScrollShadow
          hideScrollBar
          size={40}
          orientation="horizontal"
          className="z-10 flex max-w-full items-center overflow-x-auto overflow-y-hidden whitespace-nowrap p-0 pb-4 backdrop-blur-[10px]"
        >
          {renderListObjectives()}
        </ScrollShadow>
      )
    }

    return renderListObjectives()
  }

  const renderOBjectiveRightContent = () => {
    switch (activeKey) {
      case "WELCOME_ONBOARD":
        return (
          <WelcomeOnboard
            listActionTaskSuccess={listActionTaskSuccess}
            callGetTaskSuccess={callGetTaskSuccess}
            listTaskSuccess={listTaskSuccess}
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
      <div className="flex w-full justify-between gap-3 max-md:flex-col">
        <div className="flex w-[30%] items-center gap-2">
          <TargetArrowIcon />
          <span className="text-22 font-bold text-mercury-950">Objectives</span>
        </div>

        <div className="flex w-[70%] items-center justify-between gap-2 max-md:w-full">
          <div className="w-[20%]">
            <span className="text-base-md max-md:text-base-14-md text-mercury-700">
              You earned
            </span>
          </div>

          <div className="relative flex-1">
            <Progress
              size="sm"
              aria-label="Loading..."
              value={progressValue}
              classNames={{
                base: "max-w-md",
                indicator: "bg-gradient-to-r from-[#83664B] to-[#A2835E]",
              }}
              isStriped
            />
            <div
              className={twMerge(`absolute top-1/2 -translate-y-1/2`)}
              style={{
                left: `${progressValue}%`,
              }}
            >
              <img src={xDSTL} width={24} height={24} />
            </div>
          </div>

          <div className="w-[30%] text-end">
            <span className="text-base-b max-md:text-base-14-b text-mercury-950">
              Up to 1600 xDSTL
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-5 max-md:flex-col max-md:gap-2">
        {renderObjectivesOptions()}
        {renderOBjectiveRightContent()}
      </div>
    </>
  )
}
export default Objectives
