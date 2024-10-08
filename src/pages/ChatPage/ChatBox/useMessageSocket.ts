import useAuthState from "@hooks/useAuthState"
import { IUser } from "@reducers/user/UserSlice"
import { useSocket } from "providers/SocketProvider"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { RoleChat } from "./ChatMessages/helpers"
import { makeId } from "@utils/index"
import { useChatMessage } from "providers/MessageProvider"

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

const useMessageSocket = () => {
  const { chatId } = useParams()
  const { socket } = useSocket()
  const { user } = useAuthState()
  const [indexRes, setIndexRes] = useState(0)
  const { setGroupsHaveNotification, setIsNewMsgOnCurrentWindow, setMessages } =
    useChatMessage()

  const isPassRuleMessage = (e: IDataListen) => {
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

  const isReloadWhenResponse = (index: number) => {
    if (index === 1) setIndexRes(1)
    if (indexRes !== 1) return true

    return false
  }

  const handleWithUpdate = (e: IDataListen) => {
    if (isReloadWhenResponse(e.index)) return
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

  const handleWithDone = (e: IDataListen) => {
    const isNeedAppendWhenDone = indexRes !== 1
    if (isNeedAppendWhenDone)
      setMessages((prev) =>
        prev.map((item) => {
          if (item.id === e.msgId) {
            return {
              ...item,
              content: e.messages,
              isTyping: false,
            }
          }
          return item
        }),
      )
  }

  const handleResponseForMessage = (e: IDataListen) => {
    if (!isPassRuleMessage(e)) return
    if (e.event === StatusMessage.TYPING) handleWithTyping(e)
    if (e.event === StatusMessage.UPDATE) handleWithUpdate(e)
    if (e.event === StatusMessage.GROUP) handleWithGroup(e)
    if (e.event === StatusMessage.DONE) handleWithDone(e)
  }

  const isPassRuleNotification = (e: IDataListen) => {
    if (e?.user?.id === user?.id) return false
    if (Number(chatId) === e.group) return false
    return true
  }

  const handleResponseForNotification = (e: IDataListen) => {
    if (!isPassRuleNotification(e)) return
    setGroupsHaveNotification((prev) =>
      prev.includes(e.group) ? [...prev] : [...prev, e.group],
    )
  }

  const isPassRuleNewMsg = (e: IDataListen) => {
    if (e?.user?.id === user?.id) return false
    if (Number(chatId) !== e.group) return false
    return true
  }

  const handleResponseForNewMsg = (e: IDataListen) => {
    if (!isPassRuleNewMsg(e)) return
    setIsNewMsgOnCurrentWindow(true)
  }

  useEffect(() => {
    if (socket && user?.id) {
      const event = "chat-group"
      socket.on(event, (e: IDataListen) => {
        handleResponseForMessage(e)
        handleResponseForNotification(e)
        handleResponseForNewMsg(e)
      })

      return () => {
        socket.off(event)
      }
    }
  }, [socket, user?.id, isPassRuleMessage, isPassRuleNotification])

  useEffect(() => {
    setIndexRes(0)
  }, [chatId])
}

export default useMessageSocket
