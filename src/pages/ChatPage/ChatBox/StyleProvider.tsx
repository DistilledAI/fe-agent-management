import React, { createContext, useContext, useState } from "react"

type MessageProviderProps = {
  children: React.ReactNode
}

export interface StyleState {
  style: React.CSSProperties
  setStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>
}

export const initialState: StyleState = {
  style: {},
  setStyle: () => null,
}

const StyleBoxChatContext = createContext(initialState)

export const StyleBoxChatProvider: React.FC<MessageProviderProps> = ({
  children,
}) => {
  const [style, setStyle] = useState<React.CSSProperties>({})

  return (
    <StyleBoxChatContext.Provider value={{ style, setStyle }}>
      {children}
    </StyleBoxChatContext.Provider>
  )
}

export const useStyleBoxChat = () => useContext(StyleBoxChatContext)
