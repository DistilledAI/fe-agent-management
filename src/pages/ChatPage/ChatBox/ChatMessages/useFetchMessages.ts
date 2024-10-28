import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getChatHistoryById } from "services/chat"
import { IGroup } from "../LeftBar/useFetchGroups"
import { IUser } from "@reducers/userSlice"
import { convertDataFetchToMessage, IMessageBox } from "./helpers"
import useAuthState from "@hooks/useAuthState"
import { PATH_NAMES } from "@constants/index"
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query"

export interface IMessage {
  id: number
  groupId: number
  userId: number
  messages: string
  status: number
  createdAt: string
  group: IGroup
  user: IUser
}

export interface ICachedMessageData {
  pageParams: Array<number>
  pages: Array<{
    messages: IMessageBox[]
    nextOffset: number
  }>
}

export const messagesQueryKey = (chatId: string | undefined) => {
  if (!chatId) return []
  return [`chat-messages-${chatId}`]
}

const useFetchMessages = () => {
  const { user, isLogin } = useAuthState()
  const { chatId, privateChatId } = useParams()
  const navigate = useNavigate()
  const groupId = privateChatId || chatId

  const fetchMessages = async ({ pageParam = 0 }) => {
    if (!groupId) return

    const res = await getChatHistoryById({
      id: Number(groupId),
      offset: pageParam,
    })

    return {
      messages: convertDataFetchToMessage(res.data.items, user?.id || 0),
      nextOffset:
        res.data.items.length > 0
          ? pageParam + res.data.items.length
          : undefined,
    }
  }

  const {
    data,
    error,
    fetchPreviousPage,
    hasPreviousPage,
    isFetched,
    isLoading,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
    queryKey: messagesQueryKey(groupId),
    queryFn: fetchMessages,
    enabled: isLogin && !!groupId && !!user?.id,
    getNextPageParam: (lastPage) => lastPage?.nextOffset,
    getPreviousPageParam: (firstPage) => firstPage?.nextOffset,
    staleTime: 1 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    initialPageParam: 0,
  })

  useEffect(() => {
    if (error) {
      console.error(error)
      navigate(PATH_NAMES.HOME)
    }
  }, [error])

  const onLoadPrevMessages = async () => {
    try {
      const res = await fetchPreviousPage()
      if (res.data?.pages[0]?.messages.length) {
        return res.data?.pages[0].messages.length - 1
      }
      return 0
    } catch (error) {
      console.error(error)
    }
  }

  const messages =
    (
      data as InfiniteData<{ messages: IMessageBox[] }> | undefined
    )?.pages.flatMap((page) => page.messages) || []

  return {
    onLoadPrevMessages,
    messages: messages,
    hasPreviousMore: hasPreviousPage,
    isLoading,
    isFetched,
    isFetchingPreviousPage,
  }
}

export default useFetchMessages
