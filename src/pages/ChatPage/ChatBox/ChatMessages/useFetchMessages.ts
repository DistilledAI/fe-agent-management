import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getChatHistoryById } from "services/chat"
import { IGroup } from "../LeftBar/useFetchGroups"
import { IUser } from "@reducers/userSlice"
import { convertDataFetchToMessage } from "./helpers"
import useAuthState from "@hooks/useAuthState"
import { useChatMessage } from "providers/MessageProvider"
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

export const queryChatMessagesKey = (chatId: string | undefined) => {
  if (!chatId) return []
  return [`chat-messages-${chatId}`]
}

const useFetchMessages = () => {
  const { setMessages } = useChatMessage()
  const { user } = useAuthState()
  const { chatId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const fetchMessages = async () => {
    if (!chatId) return
    const res = await getChatHistoryById({ id: Number(chatId) })
    return convertDataFetchToMessage(res.data.items, user?.id ? user.id : 0)
  }

  const { data, error, isFetching } = useQuery({
    queryKey: queryChatMessagesKey(chatId),
    queryFn: fetchMessages,
    enabled: !!chatId && !!user?.id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (data) {
      setMessages(data)
    }
  }, [data?.length, chatId])

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
      if (!chatId) return
      const res = await getChatHistoryById({
        id: Number(chatId),
        offset,
        limit,
      })
      if (res.data.items) {
        const newMessages = convertDataFetchToMessage(
          res.data.items,
          user?.id ? user.id : 0,
        )
        queryClient.setQueryData(
          queryChatMessagesKey(chatId),
          (oldData: any) => [...newMessages, ...oldData],
        )

        setMessages((prevData) => [...newMessages, ...prevData])
      }
      return res.data.items.length || 0
    } catch (error) {
      console.error(error)
    }
  }

  return { loading: isFetching, onLoadPrevMessages }
}

export default useFetchMessages
