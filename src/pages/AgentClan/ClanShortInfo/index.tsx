import { xDSTL, xpIcon } from "@assets/images"
import { BoltIcon, TrophyIcon } from "@components/Icons"
import { ArrowRightIcon } from "@components/Icons/Arrow"
import { CircularProgress, Image } from "@nextui-org/react"
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"
import LeaderboardClan from "../LeaderboardClan"
import { useParams } from "react-router-dom"
import { formatNumberWithComma } from "@utils/index"
import useTimerProgress from "@hooks/useTimerProgress"
import { useLayoutEffect } from "react"

const ClanShortInfo = () => {
  const queryClient = useQueryClient()
  const { timerProgress, setTimerProgress } = useTimerProgress(60000)
  const { chatId } = useParams()
  const { data: chatIdParam } = useQuery({
    queryKey: [QueryDataKeys.CHAT_ID_BY_USERNAME, chatId],
    enabled: !!chatId,
  })
  const groupId = chatIdParam ? chatIdParam?.toString() : ""
  const queries = useQueries<[{ data: any }, { data: any }, { data: any }]>({
    queries: [
      {
        queryKey: [QueryDataKeys.TOTAL_EXP_POINT_USER, groupId],
        enabled: !!groupId,
      },
      {
        queryKey: [QueryDataKeys.GROUP_DETAIL, groupId],
        enabled: !!groupId,
      },
      {
        queryKey: [QueryDataKeys.EARN_EXP_REMAINING_DAYS],
        enabled: true,
      },
    ],
  })
  const expPointUser = queries[0]?.data
  const xDSTLTotalPoint = queries[1]?.data?.data?.group?.event?.totalPoint
  const remainingDays = queries[2]?.data

  const handleRefetchXpPoint = () => {
    queryClient.invalidateQueries({
      queryKey: [QueryDataKeys.TOTAL_EXP_POINT_USER, groupId],
    })
    setTimerProgress(0)
  }

  useLayoutEffect(() => {
    if (!timerProgress) {
      handleRefetchXpPoint()
    }
  }, [timerProgress, groupId])

  const toggleLeaderboardClan = () => {
    queryClient.setQueryData(
      [QueryDataKeys.TOGGLE_LEADERBOARD_CLAN],
      () => true,
    )
  }

  return (
    <>
      <div className="w-full pb-1">
        <div className="flex w-full items-center rounded-full bg-mercury-30 px-4 py-[10px]">
          <div className="relative flex w-full items-center justify-between">
            <div className="absolute left-1/2 h-[26px] w-[1px] -translate-x-1/2 bg-mercury-200" />
            <div className="flex w-[calc(50%-15px)] items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <p className="text-14 text-mercury-900">Rewards</p>
                <div className="flex items-center gap-1">
                  <Image
                    src={xDSTL}
                    alt="xdstl"
                    className="h-[22px] w-[22px]"
                  />
                  <span className="text-14 font-bold text-mercury-950">
                    {formatNumberWithComma(xDSTLTotalPoint) || "-"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <BoltIcon />
                <span className="text-14">{remainingDays || 0} days left</span>
              </div>
            </div>
            <div className="flex w-[calc(50%-15px)] items-center justify-between">
              <span className="text-14 text-mercury-900">Your EXP</span>
              <div className="flex items-center gap-2">
                <button type="button" onClick={handleRefetchXpPoint}>
                  <CircularProgress
                    aria-label="Loading..."
                    value={timerProgress}
                    minValue={0}
                    maxValue={100}
                    classNames={{
                      svg: "w-5 h-5 drop-shadow-md",
                      indicator: "stroke-[#7B5FC5]",
                    }}
                    strokeWidth={4}
                  />
                </button>
                <div
                  className="flex cursor-pointer items-center gap-3"
                  onClick={toggleLeaderboardClan}
                >
                  <div className="flex items-center gap-1">
                    <TrophyIcon />
                    <span className="text-14 font-bold text-mercury-950">
                      {expPointUser?.rank || "-"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image src={xpIcon} alt="xp" className="h-6 w-6" />
                    <span className="text-14 font-bold text-mercury-950">
                      {expPointUser?.totalPoint || "-"}
                    </span>
                  </div>
                  <div className="-mr-1 hover:opacity-70">
                    <ArrowRightIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LeaderboardClan />
    </>
  )
}

export default ClanShortInfo
