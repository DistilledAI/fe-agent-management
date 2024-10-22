import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getChatHistoryById } from "services/chat"
import { IGroup } from "../LeftBar/useFetchGroups"
import { IUser } from "@reducers/userSlice"
import { convertDataFetchToMessage } from "./helpers"
import useAuthState from "@hooks/useAuthState"
import { PATH_NAMES } from "@constants/index"
import { useQuery, useQueryClient } from "@tanstack/react-query"

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

export const messagesQueryKey = (chatId: string | undefined) => {
  if (!chatId) return []
  return [`chat-messages-${chatId}`]
}

const useFetchMessages = () => {
  const { user } = useAuthState()
  const { chatId, privateChatId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const groupId = privateChatId || chatId

  const fetchMessages = async () => {
    if (!groupId) return
    const res = await getChatHistoryById({ id: Number(groupId) })
    return convertDataFetchToMessage(res.data.items, user?.id ? user.id : 0)
  }

  const { data, error, isFetching } = useQuery({
    queryKey: messagesQueryKey(groupId),
    queryFn: fetchMessages,
    enabled: !!groupId && !!user?.id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (error) {
      console.error(error)
      navigate(PATH_NAMES.HOME)
    }
  }, [error, navigate])

  const onLoadPrevMessages = async ({
    offset,
    limit,
  }: {
    offset?: number
    limit?: number
  }) => {
    try {
      if (!groupId) return
      const res = await getChatHistoryById({
        id: Number(groupId),
        offset,
        limit,
      })
      if (res.data.items) {
        const newMessages = convertDataFetchToMessage(
          res.data.items,
          user?.id ? user.id : 0,
        )
        queryClient.setQueryData(messagesQueryKey(groupId), (oldData: any) => [
          ...newMessages,
          ...oldData,
        ])
      }
      return res.data.items.length || 0
    } catch (error) {
      console.error(error)
    }
  }

  return { loading: isFetching, onLoadPrevMessages, messages: data ?? [] }
}

export default useFetchMessages
