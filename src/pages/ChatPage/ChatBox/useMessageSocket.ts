import { useSocket } from "providers/SocketProvider"
import { IMessageBox, RoleChat } from "./ChatMessages/helpers"
import React, { useEffect, useState } from "react"
import useAuthState from "@hooks/useAuthState"
import { useParams } from "react-router-dom"

interface IDataListen {
  event: string
  group: number
  messages: string
}

const useMessageSocket = (
  setMessages: React.Dispatch<React.SetStateAction<IMessageBox[]>>,
) => {
  const { chatId } = useParams()
  const [data, setData] = useState<string>("")
  const { socket } = useSocket()
  const { user } = useAuthState()

  const listenEventMsg = () => {
    if (!socket || !user) return
    const event = `chat-userId-${user.id}`
    socket.on(event, (e) => {
      setData(JSON.stringify(e))
    })
  }

  useEffect(() => {
    if (user && socket) listenEventMsg()
  }, [user, socket])

  useEffect(() => {
    if (data) {
      const dt: IDataListen = JSON.parse(data)
      if (dt.group === Number(chatId))
        setMessages((prev) => [
          ...prev,
          { role: RoleChat.CUSTOMER, content: dt.messages },
        ])
    }
    setData("")
  }, [data, chatId])
}

export default useMessageSocket
