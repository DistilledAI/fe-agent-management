import { CalculatingIcon } from "@components/Icons/BettingPage/CalculatingIcon"
import { ExpiredIcon } from "@components/Icons/BettingPage/ExpiredIcon"
import { LaterIcon } from "@components/Icons/BettingPage/LaterIcon"
import { LiveIcon } from "@components/Icons/BettingPage/LiveIcon"
import { NextIcon } from "@components/Icons/BettingPage/NextIcon"
import { twMerge } from "tailwind-merge"
import { CalculatingCardContent } from "./CalculatingCardContent"
import CardLiveBet from "./CardLive"
import ExpireCardContent from "./ExpireCardContent"
import { LaterCardContent } from "./LaterCardContent"
import NextCardContent from "./NextCardContent"

interface CardContainerProps {
  roundItem: any
  currentRound: any
  isActive: boolean
  onClick: () => void
}

export enum STATUS_ROUND {
  EXPIRED,
  LIVE,
  NEXT,
  CALCULATING,
  LATER,
}

export enum BET_TYPE {
  UP = "up",
  DOWN = "down",
  DRAW = "draw",
}

export const CardContent = ({
  roundItem,
  currentRound,
}: {
  roundItem: any
  currentRound: any
}) => {
  switch (roundItem.status) {
    case STATUS_ROUND.EXPIRED:
      return <ExpireCardContent roundItem={roundItem} />
    case STATUS_ROUND.LIVE:
      return <CardLiveBet roundItem={roundItem} currentRound={currentRound} />
    case STATUS_ROUND.NEXT:
      return <NextCardContent roundItem={roundItem} />
    case STATUS_ROUND.CALCULATING:
      return <CalculatingCardContent roundItem={roundItem} />
    case STATUS_ROUND.LATER:
      return <LaterCardContent roundItem={roundItem} />
  }
}

const CardContainer: React.FC<CardContainerProps> = ({
  roundItem,
  isActive,
  onClick,
  currentRound,
}) => {
  return (
    <div
      className={twMerge(
        "relative w-full rounded-[12px] border border-[#1A1C28] bg-[#13141D] font-medium duration-150 ease-in hover:brightness-125",
        roundItem.status === STATUS_ROUND.EXPIRED && "brightness-75",
        isActive && "border border-[#E8E9EE] brightness-100",
      )}
      onClick={onClick}
    >
      <CardHeader roundItem={roundItem} />
      <CardContent roundItem={roundItem} currentRound={currentRound} />
    </div>
  )
}
export default CardContainer

export const CardHeader = ({ roundItem }: { roundItem: any }) => {
  const HeaderByStatus: any = {
    [STATUS_ROUND.EXPIRED]: {
      text: "EXPIRED",
      titleTextClass: "text-[#585A6B] ml-1",
      icon: <ExpiredIcon />,
    },
    [STATUS_ROUND.LIVE]: {
      text: "LIVE",
      titleTextClass: "text-[#080A14] ml-1",
      icon: <LiveIcon color="#080A14" />,
    },
    [STATUS_ROUND.NEXT]: {
      text: "NEXT",
      titleTextClass: "text-[#FCFCFC] ml-1",
      icon: <NextIcon />,
    },
    [STATUS_ROUND.CALCULATING]: {
      text: "CALCULATING",
      titleTextClass: "text-[#FCFCFC] ml-1",
      icon: <CalculatingIcon />,
    },
    [STATUS_ROUND.LATER]: {
      text: "LATER",
      titleTextClass: "text-[#585A6B] ml-1",
      icon: <LaterIcon />,
    },
  }

  const { status, round } = roundItem
  const { icon, text, titleTextClass } = HeaderByStatus[status]

  return (
    <div
      className={twMerge(
        "flex h-10 items-center justify-between gap-2 rounded-t-[12px] bg-[#1A1C28] px-4 py-3 text-[12px] font-medium text-[#FCFCFC]",
        status === STATUS_ROUND.LIVE && "bg-[#E4775D]",
      )}
    >
      <div className="flex items-center">
        {icon}
        <span className={twMerge("ml-1", titleTextClass)}>{text}</span>
      </div>
      <div
        className={twMerge(
          "text-[#585A6B]",
          status === STATUS_ROUND.LIVE && "text-[#080A14]",
        )}
      >
        #{round}
      </div>
    </div>
  )
}
