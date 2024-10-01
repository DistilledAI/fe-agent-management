import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getChatHistoryById } from "services/chat"
import { IGroup } from "../LeftBar/useFetchGroup"
import { IUser } from "@reducers/user/UserSlice"
import { convertDataFetchToMessage } from "./helpers"
import useAuthState from "@hooks/useAuthState"
import { useChatMessage } from "providers/MessageProvider"

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

const useFetchMessages = () => {
  const [loading, setLoading] = useState(false)
  const { setDataFetch, setMessages } = useChatMessage()
  const { user } = useAuthState()
  const { chatId } = useParams()

  const fetchData = async () => {
    try {
      if (!chatId) return
      setLoading(true)
      const res = await getChatHistoryById(Number(chatId))
      if (res.data.items) {
        setDataFetch(res.data.items)
        setMessages(
          convertDataFetchToMessage(res.data.items, user?.id ? user.id : 0),
        )
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setDataFetch([])
    setMessages([])
    if (user?.id) fetchData()
  }, [chatId, user?.id])

  return { loading }
}

export default useFetchMessages
