import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import React, { createContext, useContext, useState } from "react"

type MessageProviderProps = {
  children: React.ReactNode
}

export interface MessageState {
  messages: IMessageBox[]
  setMessages: React.Dispatch<React.SetStateAction<IMessageBox[]>>
  groupsHaveNotification: Array<number>
  setGroupsHaveNotification: React.Dispatch<React.SetStateAction<Array<number>>>
  isNewMsgOnCurrentWindow: boolean
  setIsNewMsgOnCurrentWindow: React.Dispatch<React.SetStateAction<boolean>>
  setIsChatting: React.Dispatch<React.SetStateAction<boolean>>
  isChatting: boolean
}

export const initialState: MessageState = {
  messages: [],
  setMessages: () => null,
  groupsHaveNotification: [],
  setGroupsHaveNotification: () => null,
  isNewMsgOnCurrentWindow: false,
  setIsNewMsgOnCurrentWindow: () => null,
  setIsChatting: () => null,
  isChatting: false,
}

const MessageProviderContext = createContext(initialState)

export const ChatMessageProvider: React.FC<MessageProviderProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<IMessageBox[]>([])
  const [isChatting, setIsChatting] = useState<boolean>(false)
  const [isNewMsgOnCurrentWindow, setIsNewMsgOnCurrentWindow] =
    useState<boolean>(false)
  const [groupsHaveNotification, setGroupsHaveNotification] = useState<
    Array<number>
  >([])

  return (
    <MessageProviderContext.Provider
      value={{
        messages,
        setMessages,
        groupsHaveNotification,
        setGroupsHaveNotification,
        isNewMsgOnCurrentWindow,
        setIsNewMsgOnCurrentWindow,
        setIsChatting,
        isChatting,
      }}
    >
      {children}
    </MessageProviderContext.Provider>
  )
}

export const useChatMessage = () => useContext(MessageProviderContext)
