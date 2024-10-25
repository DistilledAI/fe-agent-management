import useAuthState from "@hooks/useAuthState"
import { IUser } from "@reducers/userSlice"
import { useSocket } from "providers/SocketProvider"
import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { IMessageBox, RoleChat } from "./ChatMessages/helpers"
import { makeId, textToVoice } from "@utils/index"
import { TYPE_BOT } from "@constants/index"
import { useQueryClient } from "@tanstack/react-query"
import {
  ICachedMessageData,
  messagesQueryKey,
} from "./ChatMessages/useFetchMessages"
import { QueryDataKeys } from "types/queryDataKeys"

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
  const queryClient = useQueryClient()
  const groupChatId = chatId || privateChatId

  const isPassRuleMessage = (e: IDataListen) => {
    if (e.user.id === user?.id) return false
    if (e.group !== Number(groupChatId)) return false

    return true
  }

  const addNewMsg = (newMsg: IMessageBox) => {
    queryClient.setQueryData(
      messagesQueryKey(groupChatId),
      (cachedData: ICachedMessageData) => {
        if (!cachedData)
          return {
            pageParams: [],
            pages: [
              {
                messages: [newMsg],
                nextOffset: 0,
              },
            ],
          }

        const lastPage = cachedData.pages[cachedData.pages.length - 1]

        return {
          ...cachedData,
          pages: [
            ...cachedData.pages.slice(0, -1),
            {
              ...lastPage,
              messages: [...lastPage.messages, newMsg],
            },
          ],
        }
      },
    )
  }

  const updateNewMsg = (e: IDataListen, isPlusMsg: boolean = true) => {
    queryClient.setQueryData(
      messagesQueryKey(groupChatId),
      (cachedData: ICachedMessageData) => {
        if (!cachedData)
          return {
            pageParams: [],
            pages: [
              {
                messages: [],
                nextOffset: 0,
              },
            ],
          }

        const lastPage = cachedData.pages[cachedData.pages.length - 1]

        return {
          ...cachedData,
          pages: [
            ...cachedData.pages.slice(0, -1),
            {
              ...lastPage,
              messages: lastPage.messages.map((item) => {
                if (item.id === e.msgId) {
                  return {
                    ...item,
                    content: isPlusMsg ? item.content + e.messages : e.messages,
                    isTyping: false,
                  }
                }
                return item
              }),
            },
          ],
        }
      },
    )
  }

  const handleWithTyping = (e: IDataListen) => {
    const newMsg = {
      id: e.msgId,
      role: RoleChat.CUSTOMER,
      content: "",
      avatar: e.user.avatar,
      isTyping: true,
      roleOwner: e.user.role,
      createdAt: new Date().toISOString(),
    }
    addNewMsg(newMsg)
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
    updateNewMsg(e)
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
    addNewMsg(newMsg)
  }

  const handleWithDone = (e: IDataListen) => {
    const isNeedAppendWhenDone = indexResRef.current !== 0
    const isBotVoice = e.user.typeBot === TYPE_BOT.VOICE
    if (isBotVoice) textToVoice(e.messages, e.user.configBot)
    if (isNeedAppendWhenDone) {
      updateNewMsg(e, false)
    }
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
    queryClient.setQueryData<number[]>(
      [QueryDataKeys.NOTIFICATION_GROUPS],
      (prev = []) => (prev.includes(e.group) ? prev : [...prev, e.group]),
    )
  }

  const isPassRuleNewMsg = (e: IDataListen) => {
    if (e?.user?.id === user?.id) return false
    if (Number(groupChatId) !== e.group) return false
    return true
  }

  const handleResponseForNewMsg = (e: IDataListen) => {
    if (!isPassRuleNewMsg(e)) return
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
