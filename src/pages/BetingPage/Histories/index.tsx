import { HistoriesIcon } from "@components/Icons/BettingPage/HistoriesIcon"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { BET_TYPE } from "../CardContainer"
import HistoryItem from "./HistoryItem"

const Histories = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState(TAB_HISTORY.ALL)

  return (
    <>
      <button
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#13141D] shadow shadow-[rgba(255,_255,_255,_0.08)] transition-all hover:brightness-125"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <HistoriesIcon />
      </button>
      <div
        className={
          "fixed right-0 top-[95px] z-50 flex h-[calc(100dvh-95px)] w-screen max-w-[480px] flex-col rounded-t-[32px] bg-[#13141D] p-6 pb-5 transition-all md:top-[110px] md:h-[calc(100dvh-110px)] " +
          ` ${isOpen ? "" : "translate-x-[100%]"}`
        }
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[18px] font-medium text-[#E8E9EE]">
            History
          </span>
          <div
            className="cursor-pointer transition-all hover:brightness-150"
            onClick={() => {
              setIsOpen(false)
            }}
          >
            <CloseFilledIcon />
          </div>
        </div>
        <div className="text-[14px] font-medium text-[#9192A0]">
          Your position will appear here
        </div>
        <div className="my-8 flex items-center gap-4">
          {Object.values(TAB_HISTORY).map((e, idx) => {
            return (
              <div
                key={`$tab_history_predict_${idx}_${e}`}
                className={twMerge(
                  `flex h-10 cursor-pointer items-center justify-center rounded border border-[rgba(88,_90,_107,_0.32)] bg-[#13141d] px-2 py-1 text-[16px] text-[#585A6B] hover:brightness-125 md:px-4`,
                  selectedTab === e &&
                    "border-[#080A14] bg-[#080A14] text-[#E8E9EE]",
                )}
                onClick={() => setSelectedTab(e)}
              >
                {e}
              </div>
            )
          })}
        </div>
        <div className="flex h-full flex-col gap-6 overflow-y-auto">
          {MOCK_HISTORIES.map((e, idx) => {
            return (
              <div key={`history_item_${idx}_${e.round}__`}>
                <HistoryItem item={e} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Histories

export enum TAB_HISTORY {
  ALL = "ALL",
  COLLECTED = "COLLECTED",
  UNCOLLECT = "UNCOLLECT",
}

export const MOCK_HISTORIES = [
  {
    round: 120,
    userPrediction: BET_TYPE.UP,
    amount: 10,
    reward: 3405,
    isClaimed: false,
    result: BET_TYPE.UP,
  },
  {
    round: 121,
    userPrediction: BET_TYPE.DOWN,
    amount: 10,
    reward: 10,
    isClaimed: false,
    result: BET_TYPE.UP,
  },
  {
    round: 122,
    userPrediction: BET_TYPE.UP,
    amount: 10,
    reward: 3405,
    isClaimed: false,
    result: BET_TYPE.DRAW,
  },
  {
    round: 123,
    userPrediction: BET_TYPE.UP,
    amount: 5,
    reward: 1234,
    isClaimed: true,
    result: BET_TYPE.UP,
  },
  {
    round: 124,
    userPrediction: BET_TYPE.DOWN,
    amount: 10,
    reward: 10,
    isClaimed: false,
    result: BET_TYPE.UP,
  },
  {
    round: 120,
    userPrediction: BET_TYPE.UP,
    amount: 10,
    reward: 3405,
    isClaimed: false,
    result: BET_TYPE.UP,
  },
  {
    round: 120,
    userPrediction: BET_TYPE.UP,
    amount: 10,
    reward: 3405,
    isClaimed: false,
    result: BET_TYPE.UP,
  },
  {
    round: 120,
    userPrediction: BET_TYPE.UP,
    amount: 10,
    reward: 3405,
    isClaimed: false,
    result: BET_TYPE.UP,
  },
  {
    round: 120,
    userPrediction: BET_TYPE.UP,
    amount: 10,
    reward: 3405,
    isClaimed: false,
    result: BET_TYPE.UP,
  },
  {
    round: 120,
    userPrediction: BET_TYPE.UP,
    amount: 10,
    reward: 3405,
    isClaimed: false,
    result: BET_TYPE.UP,
  },
  {
    round: 120,
    userPrediction: BET_TYPE.UP,
    amount: 10,
    reward: 3405,
    isClaimed: true,
    result: BET_TYPE.UP,
  },
  {
    round: 120,
    userPrediction: BET_TYPE.UP,
    amount: 10,
    reward: 3405,
    isClaimed: false,
    result: BET_TYPE.UP,
  },
  {
    round: 120,
    userPrediction: BET_TYPE.UP,
    amount: 10,
    reward: 3405,
    isClaimed: false,
    result: BET_TYPE.UP,
  },
  {
    round: 120,
    userPrediction: BET_TYPE.UP,
    amount: 10,
    reward: 3405,
    isClaimed: false,
    result: BET_TYPE.UP,
  },
]
