import useAuthState from "@hooks/useAuthState"
import { useInfiniteQuery } from "@tanstack/react-query"
import { BotDataTypeKey } from "@types"
import { getMyBotData } from "services/user"
import { QueryDataKeys } from "types/queryDataKeys"
import { IBotData } from "types/user"

const LIMIT = 10

const useFetchByCategory = (category: BotDataTypeKey, botId: number) => {
  const { isLogin } = useAuthState()

  const handleFetch = async ({ pageParam = 1 }) => {
    const offset = (pageParam - 1) * LIMIT
    const res = await getMyBotData(botId, {
      limit: LIMIT,
      offset,
      filter: JSON.stringify({ key: category }),
    })
    if (res.data) return res.data.items || []
    return []
  }

  const {
    data,
    isFetching,
    isFetchingNextPage,
    isFetched,
    hasNextPage,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [`${QueryDataKeys.MY_BOT_DATA}-${botId}-${category}`],
    queryFn: handleFetch,
    initialPageParam: 1,
    enabled: !!botId && isLogin && !!category,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
  })

  const list: IBotData[] = data ? data.pages.flat() : []

  return {
    list,
    isFetching,
    isFetched,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  }
}

export default useFetchByCategory
