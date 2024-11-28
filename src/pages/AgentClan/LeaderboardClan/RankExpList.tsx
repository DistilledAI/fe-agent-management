import { TrophyFilledIcon } from "@components/Icons"
import { Virtuoso } from "react-virtuoso"
import DotLoading from "@components/DotLoading"
import { twMerge } from "tailwind-merge"
import { useQueries, useQueryClient } from "@tanstack/react-query"
import { getTotalExpPointGroup } from "services/point"
import { useParams } from "react-router-dom"
import { QueryDataKeys } from "types/queryDataKeys"
import RankExpCard from "./RankExpCard"
import useRankExpList from "./useRankExpList"
import useAuthState from "@hooks/useAuthState"

const RankExpList = () => {
  const queryClient = useQueryClient()
  const { user } = useAuthState()
  const { chatId } = useParams()
  const groupId =
    queryClient
      .getQueryData([QueryDataKeys.CHAT_ID_BY_USERNAME, chatId])
      ?.toString() || ""
  const { rankList, isLoading } = useRankExpList({
    groupId,
  })
  const queries = useQueries<[{ data: any }, { data: any }, { data: any }]>({
    queries: [
      {
        queryKey: ["total-exp-point-group", groupId],
        queryFn: () => getTotalExpPointGroup(Number(groupId)),
        enabled: !!groupId,
      },
      {
        queryKey: ["total-exp-point-user", groupId],
        enabled: !!groupId,
      },
      {
        queryKey: [QueryDataKeys.GROUP_DETAIL, groupId],
        enabled: !!groupId,
      },
    ],
  })

  const expPointGroup = queries[0]?.data
  const expPointUser = queries[1]?.data
  const xDSTLTotalPoint = queries[2]?.data?.data?.group?.event?.totalPoint

  const getXDSTL = (totalExpPointUser: number) => {
    if (totalExpPointUser && expPointGroup?.totalPoint && xDSTLTotalPoint) {
      return (
        (totalExpPointUser / Number(expPointGroup?.totalPoint)) *
        xDSTLTotalPoint
      ).toFixed(0)
    }
    return "0"
  }

  return (
    <div className="h-full space-y-2 py-4">
      <div className="px-6">
        <div className="flex items-center gap-2">
          <TrophyFilledIcon />
          <h4 className="text-16 font-medium text-mercury-800">Leaderboard</h4>
        </div>
        <p className="text-14 text-mercury-500">
          All EXP converts to xDSTL after the competition ends.
        </p>
      </div>
      <div className="h-[calc(100dvh-400px)] space-y-2">
        <RankExpCard
          classNames={{
            wrapper: "border border-brown-500 bg-brown-50 mx-6 pt-2",
          }}
          rank={expPointUser?.rank}
          avatarUrl={user?.avatar}
          publicAddress={user?.publicAddress}
          username={user?.username}
          exp={expPointUser?.totalPoint}
          xDSTL={getXDSTL(expPointUser?.totalPoint)}
        />
        <Virtuoso
          style={{ height: "100%" }}
          data={rankList}
          components={{
            Footer: () =>
              isLoading && rankList.length > 0 ? (
                <div className="flex items-center justify-center">
                  <DotLoading />
                </div>
              ) : null,
          }}
          increaseViewportBy={500}
          // endReached={async (index) => {
          //   if (index + 1 >= 10) {
          //     await fetchNextPage()
          //   }
          // }}
          itemContent={(index, rankItem) => {
            return (
              <RankExpCard
                key={index}
                rank={index + 1}
                avatarUrl={rankItem.avatar}
                publicAddress={rankItem.publicAddress}
                username={rankItem.username}
                exp={rankItem.totalPointExp}
                xDSTL={getXDSTL(rankItem.totalPointExp)}
                classNames={{
                  wrapper: twMerge(
                    "mx-6",
                    index === rankList.length - 1 && "pb-24",
                  ),
                }}
              />
            )
          }}
        />
      </div>
    </div>
  )
}

export default RankExpList
