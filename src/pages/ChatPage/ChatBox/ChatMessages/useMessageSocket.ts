import useAuthState from "@hooks/useAuthState"
import { IUser } from "@reducers/user/UserSlice"
import { useSocket } from "providers/SocketProvider"
import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { IMessageBox, RoleChat } from "./helpers"
import { makeId } from "@utils/index"

interface IDataListen {
  event: string
  group: number
  messages: string
  msgId: number
  index: number
  user: IUser
}

enum StatusMessage {
  TYPING = "typing",
  UPDATE = "update",
  DONE = "message_done",
  GROUP = "chat-group",
}

const useMessageSocket = (
  setMessages: React.Dispatch<React.SetStateAction<IMessageBox[]>>,
) => {
  const { chatId } = useParams()
  const { socket } = useSocket()
  const { user } = useAuthState()

  const isPassRule = (e: IDataListen) => {
    if (e.user.id === user?.id) return false
    if (e.group !== Number(chatId)) return false

    return true
  }

  const handleWithTyping = (e: IDataListen) => {
    setMessages((prev) => [
      ...prev,
      {
        id: e.msgId,
        role: RoleChat.CUSTOMER,
        content: "",
        avatar: e.user.avatar,
        isTyping: true,
      },
    ])
  }

  const handleWithUpdate = (e: IDataListen) => {
    setMessages((prev) =>
      prev.map((item) => {
        if (item.id === e.msgId) {
          return {
            ...item,
            content: (item.content += e.messages),
            isTyping: false,
          }
        }
        return item
      }),
    )
  }

  const handleWithGroup = (e: IDataListen) => {
    if (e.messages === "...") return
    setMessages((prev) => [
      ...prev,
      {
        id: makeId(),
        role: RoleChat.CUSTOMER,
        content: e.messages,
        avatar: e.user.avatar,
      },
    ])
  }

  useEffect(() => {
    if (socket && user) {
      const event = "chat-group"
      socket.on(event, (e: IDataListen) => {
        if (!isPassRule(e)) return
        if (e.event === StatusMessage.TYPING) handleWithTyping(e)
        if (e.event === StatusMessage.UPDATE) handleWithUpdate(e)
        if (e.event === StatusMessage.GROUP) handleWithGroup(e)
      })

      return () => {
        socket.off(event)
      }
    }
  }, [socket, user, isPassRule])
}

export default useMessageSocket
