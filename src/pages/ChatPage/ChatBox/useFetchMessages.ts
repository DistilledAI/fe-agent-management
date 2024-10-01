import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getChatHistoryById } from "services/chat"
import { IGroup } from "./LeftBar/useFetchGroup"
import { IUser } from "@reducers/user/UserSlice"
import { convertDataFetchToMessage, IMessageBox } from "./ChatMessages/helpers"
import useAuthState from "@hooks/useAuthState"

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
  const [data, setData] = useState<IMessage[]>([])
  const [messages, setMessages] = useState<IMessageBox[]>([])
  const { user } = useAuthState()
  const { chatId } = useParams()

  const fetchData = async () => {
    try {
      if (!chatId) return
      setLoading(true)
      const res = await getChatHistoryById(Number(chatId))
      if (res.data.items) {
        setData(res.data.items)
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
    setData([])
    setMessages([])
    if (user?.id) fetchData()
  }, [chatId, user?.id])

  return { loading, data, messages, setMessages }
}

export default useFetchMessages
