import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import { IMessage } from "@pages/ChatPage/ChatBox/ChatMessages/useFetchMessages"
import React, { createContext, useContext, useState } from "react"

type MessageProviderProps = {
  children: React.ReactNode
}

export interface MessageState {
  dataFetch: IMessage[]
  setDataFetch: React.Dispatch<React.SetStateAction<IMessage[]>>
  messages: IMessageBox[]
  setMessages: React.Dispatch<React.SetStateAction<IMessageBox[]>>
  groupsHaveNotification: Array<number>
  setGroupsHaveNotification: React.Dispatch<React.SetStateAction<Array<number>>>
  isNewMsgOnCurrentWindow: boolean
  setIsNewMsgOnCurrentWindow: React.Dispatch<React.SetStateAction<boolean>>
}

export const initialState: MessageState = {
  dataFetch: [],
  setDataFetch: () => null,
  messages: [],
  setMessages: () => null,
  groupsHaveNotification: [],
  setGroupsHaveNotification: () => null,
  isNewMsgOnCurrentWindow: false,
  setIsNewMsgOnCurrentWindow: () => null,
}

const MessageProviderContext = createContext(initialState)

export const ChatMessageProvider: React.FC<MessageProviderProps> = ({
  children,
}) => {
  const [dataFetch, setDataFetch] = useState<IMessage[]>([])
  const [messages, setMessages] = useState<IMessageBox[]>([])
  const [isNewMsgOnCurrentWindow, setIsNewMsgOnCurrentWindow] =
    useState<boolean>(false)
  const [groupsHaveNotification, setGroupsHaveNotification] = useState<
    Array<number>
  >([])

  return (
    <MessageProviderContext.Provider
      value={{
        dataFetch,
        messages,
        setDataFetch,
        setMessages,
        groupsHaveNotification,
        setGroupsHaveNotification,
        isNewMsgOnCurrentWindow,
        setIsNewMsgOnCurrentWindow,
      }}
    >
      {children}
    </MessageProviderContext.Provider>
  )
}

export const useChatMessage = () => useContext(MessageProviderContext)
