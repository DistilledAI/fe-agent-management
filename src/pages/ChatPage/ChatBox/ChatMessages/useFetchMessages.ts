import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import useGetChatId from "@pages/ChatPage/Mobile/ChatDetail/useGetChatId"
import { IUser } from "@reducers/userSlice"
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getChatHistoryById } from "services/chat"
import { QueryDataKeys } from "types/queryDataKeys"
import { IGroup } from "../LeftBar/useFetchGroups"
import { convertDataFetchToMessage, IMessageBox } from "./helpers"

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

export const chatMessagesKey = (chatId: string | undefined) => {
  if (!chatId) return []
  return [QueryDataKeys.CHAT_MESSAGES, chatId.toString()]
}

const STALE_TIME = 60 * 60 * 1000

const useFetchMessages = () => {
  const { user, isLogin } = useAuthState()
  const { privateChatId } = useParams()
  const { chatId } = useGetChatId()
  const navigate = useNavigate()
  const groupId = privateChatId || chatId
  // const queryClient = useQueryClient()

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

  // useLayoutEffect(() => {
  //   if (groupId && user?.id) {
  //     queryClient.prefetchInfiniteQuery({
  //       queryKey: chatMessagesKey(groupId),
  //       queryFn: fetchMessages,
  //       staleTime: STALE_TIME,
  //       initialPageParam: 0,
  //     })
  //   }
  // }, [groupId, user?.id])

  const {
    data,
    error,
    fetchPreviousPage,
    hasPreviousPage,
    isFetched,
    isLoading,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
    queryKey: chatMessagesKey(groupId),
    queryFn: fetchMessages,
    enabled: isLogin && !!groupId && !!user?.id,
    getNextPageParam: (lastPage) => lastPage?.nextOffset,
    getPreviousPageParam: (firstPage) => firstPage?.nextOffset,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
    initialPageParam: 0,
  })

  useEffect(() => {
    if (error) {
      console.error(error)
      navigate(PATH_NAMES.NOT_FOUND)
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
    messages,
    hasPreviousMore: hasPreviousPage,
    isLoading,
    isFetched,
    isFetchingPreviousPage,
  }
}

export default useFetchMessages
