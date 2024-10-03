import useAuthState from "@hooks/useAuthState"
import { IUser } from "@reducers/user/UserSlice"
import { useSocket } from "providers/SocketProvider"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IMessageBox, RoleChat } from "./helpers"

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
    if (socket) {
      const event = "chat-group"
      socket.on(event, (e) => {
        if (e?.user?.id === user?.id) return
        setData(JSON.stringify(e))
      })

      return () => {
        socket.off(event)
      }
    }
  }, [socket, user])

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
