import { HistoriesIcon } from "@components/Icons/BettingPage/HistoriesIcon"
import { NoPositionIcon } from "@components/Icons/BettingPage/NoPositionIcon"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { useWallet } from "@solana/wallet-adapter-react"
import { toBN } from "@utils/format"
import { useEffect, useState } from "react"
import { getHistoryByUser, getHistoryEvents } from "services/game"
import { twMerge } from "tailwind-merge"
import { BET_TYPE } from "../CardContainer"
import { DECIMAL_SPL } from "../constants"
import HistoryItem from "./HistoryItem"

const Histories = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState(TAB_HISTORY.ALL)
  const [listHistories, setListHistories] = useState([])
  const [isRefresh, setIsRefresh] = useState(false)
  const wallet = useWallet()

  useEffect(() => {
    if (!wallet.publicKey) {
      return
    }

    ;(async () => {
      const orderHistories = await getHistoryByUser(
        wallet.publicKey?.toBase58() || "",
      )

      if (orderHistories.data) {
        const eventList = orderHistories.data
          .map((e: any) => e.eventAddr)
          .join(",")
        const eventInfo = await getHistoryEvents(eventList)

        if (eventInfo.data) {
          const fmtList = orderHistories.data.reduce(
            (acc: any, cur: any, idx: number) => {
              const eventData = eventInfo.data.find(
                (ev: any) => ev.eventAddr === cur.eventAddr,
              )

              const result = ObjResultEvent[eventData.outcome]
              const userPrediction = ObjResultEvent[cur.outcome]
              const isCalculating = !result

              const downAmount = eventData?.downAmount || 0
              const upAmount = eventData?.upAmount || 0
              const total = toBN(downAmount).plus(upAmount)

              const upOffset = !toBN(upAmount).isEqualTo(0)
                ? total.div(upAmount).toNumber()
                : total.div(10 ** DECIMAL_SPL).isEqualTo(0)
                  ? 1
                  : total.div(10 ** DECIMAL_SPL).toNumber()

              const downOffset = !toBN(downAmount).isEqualTo(0)
                ? total.div(downAmount).toNumber()
                : total.div(10 ** DECIMAL_SPL).isEqualTo(0)
                  ? 1
                  : total.div(10 ** DECIMAL_SPL).toNumber()
              const coeff =
                userPrediction === BET_TYPE.UP ? upOffset : downOffset

              const isWon = result === userPrediction
              const isDraw = result === BET_TYPE.DRAW
              const isLose =
                !isDraw && result !== userPrediction && !isCalculating
              const amount = toBN(cur.amount || 0)
                .div(10 ** DECIMAL_SPL)
                .toNumber()

              const reward = isWon
                ? toBN(coeff).multipliedBy(amount).toNumber()
                : amount

              acc.push({
                ...cur,
                ...eventData,
                isCalculating,
                userPrediction,
                result,
                reward,
                amount,
                index: idx,
                isLose,
              })

              return acc
            },
            [],
          )

          setListHistories(fmtList)
        }
      }
    })()
  }, [wallet.publicKey, isRefresh])

  const filterList = listHistories
    .filter((item: any) => {
      let condition = true
      if (selectedTab === TAB_HISTORY.COLLECTED) {
        condition = condition && item.isClaimed
      } else if (selectedTab === TAB_HISTORY.UNCOLLECT) {
        condition = condition && !item.isClaimed && !item.isLose
      }
      return condition
    })
    .sort((a: any, b: any) => {
      const sub = b.id - a.id
      if (sub) {
        return sub
      }
      return b.index - a.index
    })

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
          {filterList.length <= 0 ? (
            <div className="flex h-screen max-h-[212px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-[#30344A] bg-[#13141D] p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded border border-[#1A1C28] bg-[#080A14]">
                <NoPositionIcon />
              </div>
              <p className="mt-4 text-[16px] font-medium uppercase text-[#E8E9EE]">
                No position
              </p>
              <p className="mt-2 text-[14px] font-medium text-[#585A6B]">
                No position found!
              </p>
            </div>
          ) : (
            filterList.map((e: any, idx) => {
              return (
                <div key={`history_item_${idx}_${e.eventAddr}__`}>
                  <HistoryItem
                    item={e}
                    setIsClaimed={() => setIsRefresh(!isRefresh)}
                  />
                </div>
              )
            })
          )}
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

export const ObjResultEvent: Record<string, BET_TYPE | null> = {
  Up: BET_TYPE.UP,
  Down: BET_TYPE.DOWN,
  Undrawn: null,
  Same: BET_TYPE.DRAW,
  Invalid: BET_TYPE.DRAW,
}
