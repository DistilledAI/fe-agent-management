import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getChatHistoryById } from "services/chat"
import { IUser } from "@reducers/userSlice"
import useAuthState from "@hooks/useAuthState"
import { useChatMessage } from "providers/MessageProvider"
import { PATH_NAMES } from "@constants/index"
import { convertDataFetchToMessage } from "../../ChatMessages/helpers"
import { IGroup } from "../../LeftBar/useFetchGroups"

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

const useFetchPrivateAgentMessages = () => {
  const [loading, setLoading] = useState(false)
  const { setDataFetch, setMessages } = useChatMessage()
  const { user } = useAuthState()
  const { privateChatId } = useParams()
  const navigate = useNavigate()

  const fetchMessages = async () => {
    try {
      if (!privateChatId) return
      setLoading(true)
      const res = await getChatHistoryById({ id: Number(privateChatId) })
      if (res.data.items) {
        setDataFetch(res.data.items)
        setMessages(
          convertDataFetchToMessage(res.data.items, user?.id ? user.id : 0),
        )
      }
    } catch (error) {
      console.error(error)
      navigate(PATH_NAMES.HOME)
    } finally {
      setLoading(false)
    }
  }

  const onLoadPrevMessages = async ({
    offset,
    limit,
  }: {
    offset?: number
    limit?: number
  }) => {
    try {
      if (!privateChatId) return
      const res = await getChatHistoryById({
        id: Number(privateChatId),
        offset,
        limit,
      })
      if (res.data.items) {
        setDataFetch((prevData) => [...res.data.items, ...prevData])
        setMessages((prevData) => [
          ...convertDataFetchToMessage(res.data.items, user?.id ? user.id : 0),
          ...prevData,
        ])
      }
      return res.data.items.length || 0
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (user?.id) fetchMessages()
  }, [privateChatId, user?.id])

  return { loading, fetchMessages, onLoadPrevMessages }
}

export default useFetchPrivateAgentMessages
