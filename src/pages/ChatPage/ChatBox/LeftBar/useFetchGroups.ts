import useAuthState from "@hooks/useAuthState"
import { IUser } from "@reducers/userSlice"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getGroupList } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"

export enum TypeGroup {
  DIRECT = "DIRECT",
  PRIVATE_GROUP = "PRIVATE_GROUP",
}
export interface IGroup {
  id: number
  name: string
  image?: string
  userAId: number
  userBId: number
  userA: IUser
  userB: IUser
  createBy: number
  status: number
  createdAt: string
  typeGroup: TypeGroup
  live?: number
}

export interface UserGroup {
  id: number
  userId: number
  groupId: number
  joinedAt: string
  createdAt: string
  group: IGroup
}

interface FetchConfig {
  offset?: number
  limit?: number
  isLoadMore?: boolean
}

export const LIMIT = 10

const useFetchGroups = () => {
  const { isLogin } = useAuthState()
  const [hasMore, setHasMore] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [offset, setOffset] = useState(LIMIT)
  const isInvited = searchParams.get("isInvited") === "true"
  const [isFetched, setIsFetched] = useState(false)
  const queryClient = useQueryClient()

  const fetchGroups = async ({
    offset,
    limit,
    isLoadMore = false,
  }: FetchConfig) => {
    try {
      setIsFetched(true)
      const res = await getGroupList(offset, limit)
      if (res.data.items && !isLoadMore) {
        return res.data.items
      }

      // load more new groups
      if (res.data.items.length && isLoadMore) {
        queryClient.setQueryData(
          [QueryDataKeys.MY_LIST_CHAT],
          (oldData: UserGroup[]) => [...oldData, ...res.data.items],
        )
      }

      return res.data.items ? res.data.items : []
    } catch (error) {
      console.error(error)
    }
  }

  const { data, refetch, isFetching } = useQuery({
    queryKey: [QueryDataKeys.MY_LIST_CHAT],
    queryFn: () => fetchGroups({}),
    enabled: isLogin,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  const handleLoadMore = async () => {
    if (hasMore) {
      const newGroups = await fetchGroups({
        offset,
        isLoadMore: true,
      })
      if (!newGroups.length) return setHasMore(false)
      setOffset((prev) => prev + LIMIT)
    }
  }

  useEffect(() => {
    if (isInvited) {
      refetch({})
      setSearchParams((params) => {
        params.delete("isInvited")
        return params
      })
    }
  }, [isInvited])

  return {
    isLoading: isFetching,
    groups: data ?? [],
    fetchGroups: refetch,
    handleLoadMore,
    isFetched,
  }
}

export default useFetchGroups
