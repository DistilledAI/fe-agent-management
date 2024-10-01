import { useSocket } from "providers/SocketProvider"
import { IMessageBox, RoleChat } from "./helpers"
import React, { useEffect, useState } from "react"
import useAuthState from "@hooks/useAuthState"
import { useParams } from "react-router-dom"
import { IUser } from "@reducers/user/UserSlice"

interface IDataListen {
  event: string
  group: number
  messages: string
  user: IUser
}

const useMessageSocket = (
  setMessages: React.Dispatch<React.SetStateAction<IMessageBox[]>>,
) => {
  const { chatId } = useParams()
  const [data, setData] = useState<string>("")
  const { socket } = useSocket()
  const { user } = useAuthState()

  useEffect(() => {
    if (user && socket) {
      const event = `chat-userId-${user.id}`
      socket.on(event, (e) => {
        setData(JSON.stringify(e))
      })

      return () => {
        socket.off(event)
      }
    }
  }, [user, socket])

  useEffect(() => {
    if (data) {
      const dt: IDataListen = JSON.parse(data)
      if (dt.group === Number(chatId))
        setMessages((prev) => [
          ...prev,
          {
            role: RoleChat.CUSTOMER,
            content: dt.messages,
            avatar: dt.user.avatar,
          },
        ])
    }
    setData("")
  }, [data, chatId])
}

export default useMessageSocket
