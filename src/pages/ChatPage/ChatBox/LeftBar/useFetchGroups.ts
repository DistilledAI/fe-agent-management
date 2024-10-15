import useAuthState from "@hooks/useAuthState"
import { IUser } from "@reducers/userSlice"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getGroupList } from "services/chat"

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

const useFetchGroups = () => {
  const [groups, setGroups] = useState<UserGroup[]>([])
  const { isLogin, sessionAccessToken } = useAuthState()
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const isInvited = searchParams.get("isInvited") === "true"

  const fetchGroups = async ({
    offset,
    limit,
    isLoadMore = false,
  }: FetchConfig) => {
    try {
      setIsLoading(true)
      const res = await getGroupList(offset, limit)

      if (res.data.items && !isLoadMore) {
        setGroups(res.data.items)
      }

      // load more new groups
      if (res.data.items.length && isLoadMore) {
        setGroups((prevGroups) => [...prevGroups, ...res.data.items])
      }

      return res.data.items ? res.data.items : []
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isInvited) {
      fetchGroups({})
      setSearchParams((params) => {
        params.delete("isInvited")
        return params
      })
    }
  }, [isInvited])

  useEffect(() => {
    if (isLogin) fetchGroups({})
  }, [isLogin, sessionAccessToken])

  return { isLoading, groups, fetchGroups, setGroups }
}

export default useFetchGroups
