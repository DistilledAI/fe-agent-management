import React from "react"
import { twMerge } from "tailwind-merge"

interface Props {
  children: React.ReactNode
  chatBoxClassName?: string
}

const ChatBox: React.FC<Props> = ({ children, chatBoxClassName }) => {
  return (
    <div
      className={twMerge(
        "flex h-full w-full flex-col justify-between overflow-hidden rounded-[16px] bg-white ",
        chatBoxClassName,
      )}
    >
      {children}
    </div>
  )
}

export default ChatBox
