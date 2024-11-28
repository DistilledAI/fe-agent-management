import useAuthState from "@hooks/useAuthState"
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query"
import { getLeaderboardExpByGroupId } from "services/point"

interface LeaderboardEntry {
  userId: number
  publicAddress: string
  username: string
  avatar: string
  totalPointExp: number
  xDSTL: number
}

const useRankExpList = ({ groupId }: { groupId: string }) => {
  const { isLogin } = useAuthState()

  const fetchRankList = async ({ pageParam = 0 }) => {
    if (!groupId) return

    const res = await getLeaderboardExpByGroupId({
      groupId: Number(groupId),
      offset: pageParam,
    })
    return {
      rankList: res?.items || [],
      nextOffset:
        res?.items.length > 0 ? pageParam + res?.items.length : undefined,
    }
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetched,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["exp-rank-list-by-group", groupId],
    queryFn: fetchRankList,
    enabled: isLogin && !!groupId,
    getNextPageParam: (lastPage) => lastPage?.nextOffset,
    getPreviousPageParam: (firstPage) => firstPage?.nextOffset,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialPageParam: 0,
  })

  const rankList =
    (
      data as InfiniteData<{ rankList: LeaderboardEntry[] }> | undefined
    )?.pages.flatMap((page) => page.rankList) || []

  return {
    rankList,
    error,
    hasNextPage,
    isFetched,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    groupId,
  }
}

export default useRankExpList
