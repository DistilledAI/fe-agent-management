import React from "react"
import { twMerge } from "tailwind-merge"

interface Props {
  children: React.ReactNode
  chatBubblesClassName?: string
}

const ChatBubbles: React.FC<Props> = ({ children, chatBubblesClassName }) => {
  return (
    <div
      className={twMerge(
        "flex gap-2 rounded-2xl bg-gray-light-blue p-2",
        chatBubblesClassName,
      )}
    >
      {children}
    </div>
  )
}

export default ChatBubbles
