import useAuthState from "@hooks/useAuthState"
import { IUser } from "@reducers/userSlice"
import { useSocket } from "providers/SocketProvider"
import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { IMessageBox, RoleChat } from "./ChatMessages/helpers"
import { makeId, textToVoice } from "@utils/index"
import { useChatMessage } from "providers/MessageProvider"
import { TYPE_BOT } from "@constants/index"
import { useQueryClient } from "@tanstack/react-query"
import { queryChatMessagesKey } from "./ChatMessages/useFetchMessages"

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
  const { chatId, privateChatId } = useParams()
  const { socket } = useSocket()
  const { user } = useAuthState()
  const indexResRef = useRef(-1)
  const {
    setGroupsHaveNotification,
    setIsNewMsgOnCurrentWindow,
    // setMessages,
    setIsChatting,
  } = useChatMessage()
  const queryClient = useQueryClient()

  const groupChatId = chatId || privateChatId

  const isPassRuleMessage = (e: IDataListen) => {
    if (e.user.id === user?.id) return false
    if (e.group !== Number(groupChatId)) return false

    return true
  }

  const handleWithTyping = (e: IDataListen) => {
    setIsChatting(true)
    const newMsg = {
      id: e.msgId,
      role: RoleChat.CUSTOMER,
      content: "",
      avatar: e.user.avatar,
      isTyping: true,
      roleOwner: e.user.role,
      createdAt: new Date().toISOString(),
    }
    // setMessages((prev) => [...prev, newMsg])
    queryClient.setQueryData(
      queryChatMessagesKey(groupChatId),
      (oldData: IMessageBox[]) => {
        return [...oldData, newMsg]
      },
    )
  }

  const isReloadWhenResponse = (index: number) => {
    if (index === 0) indexResRef.current = 0
    if (indexResRef.current !== 0 && index !== 0) return true

    return false
  }

  const handleWithUpdate = (e: IDataListen) => {
    if (isReloadWhenResponse(e.index)) return
    const isBotVoice = e.user.typeBot === TYPE_BOT.VOICE
    if (isBotVoice) return
    // setMessages((prev) => {
    //   return prev.map((item) => {
    //     if (item.id === e.msgId) {
    //       return {
    //         ...item,
    //         content: (item.content += e.messages),
    //         isTyping: false,
    //       }
    //     }
    //     return item
    //   })
    // })
    queryClient.setQueryData(
      queryChatMessagesKey(groupChatId),
      (oldData: IMessageBox[] | undefined) => {
        if (!oldData) return []

        return oldData.map((item) => {
          if (item.id === e.msgId) {
            return {
              ...item,
              content: item.content + e.messages,
              isTyping: false,
            }
          }
          return item
        })
      },
    )
  }

  const handleWithGroup = (e: IDataListen) => {
    if (e.messages === "...") return
    const newMsg = {
      id: makeId(),
      role: RoleChat.CUSTOMER,
      content: e.messages,
      avatar: e.user.avatar,
      roleOwner: e.user.role,
      createdAt: new Date().toISOString(),
    }
    // setMessages((prev) => [...prev, newMsg])
    queryClient.setQueryData(
      queryChatMessagesKey(groupChatId),
      (oldData: IMessageBox[]) => {
        return [...oldData, newMsg]
      },
    )
  }

  const handleWithDone = (e: IDataListen) => {
    const isNeedAppendWhenDone = indexResRef.current !== 0
    const isBotVoice = e.user.typeBot === TYPE_BOT.VOICE
    if (isBotVoice) textToVoice(e.messages, e.user.configBot)
    if (isNeedAppendWhenDone) {
      // setMessages((prev) =>
      //   prev.map((item) => {
      //     if (item.id === e.msgId) {
      //       return {
      //         ...item,
      //         content: e.messages,
      //         isTyping: false,
      //       }
      //     }
      //     return item
      //   }),
      // )
      queryClient.setQueryData(
        queryChatMessagesKey(groupChatId),
        (oldData: IMessageBox[]) => {
          return oldData.map((item) => {
            if (item.id === e.msgId) {
              return {
                ...item,
                content: e.messages,
                isTyping: false,
              }
            }
            return item
          })
        },
      )
    }
    setIsChatting(false)
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
    if (Number(groupChatId) === e.group) return false
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
    if (Number(groupChatId) !== e.group) return false
    return true
  }

  const handleResponseForNewMsg = (e: IDataListen) => {
    if (!isPassRuleNewMsg(e)) return
    setIsNewMsgOnCurrentWindow(true)
  }

  useEffect(() => {
    if (socket) {
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
  }, [
    socket,
    user?.id,
    isPassRuleMessage,
    isPassRuleNotification,
    indexResRef.current,
    groupChatId,
  ])

  useEffect(() => {
    indexResRef.current = -1
  }, [groupChatId])
}

export default useMessageSocket
