import { CalculatingIcon } from "@components/Icons/BettingPage/CalculatingIcon"
import { ExpiredIcon } from "@components/Icons/BettingPage/ExpiredIcon"
import { LaterIcon } from "@components/Icons/BettingPage/LaterIcon"
import { LiveIcon } from "@components/Icons/BettingPage/LiveIcon"
import { NextIcon } from "@components/Icons/BettingPage/NextIcon"
import { twMerge } from "tailwind-merge"
import { CalculatingCardContent } from "./CalculatingCardContent"
import { ExpireCardContent } from "./ExpireCardContent"
import { LaterCardContent } from "./LaterCardContent"
import { NextCardContent } from "./NextCardContent"
import CardLiveBet from "./CardLive"

interface CardContainerProps {
  roundItem: any
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
  UP,
  DOWN,
  DRAW,
}

export const CardContent = ({ roundItem }: { roundItem: any }) => {
  switch (roundItem.status) {
    case STATUS_ROUND.EXPIRED:
      return <ExpireCardContent roundItem={roundItem} />
    case STATUS_ROUND.LIVE:
      return <CardLiveBet roundItem={roundItem} />
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
      <CardContent roundItem={roundItem} />
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
      titleTextClass: "text-[#FCFCFC] ml-1",
      icon: <LiveIcon />,
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
    <div className="flex h-10 items-center justify-between gap-2 rounded-t-[12px] bg-[#1A1C28] px-4 py-3 text-[12px] font-medium text-[#FCFCFC]">
      <div className="flex items-center">
        {icon}
        <span className={twMerge("ml-1", titleTextClass)}>{text}</span>
      </div>
      <div className="text-[#585A6B]">#{round}</div>
    </div>
  )
}
