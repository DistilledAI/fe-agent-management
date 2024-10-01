import { Virtuoso, VirtuosoHandle } from "react-virtuoso"
import { twMerge } from "tailwind-merge"
import { useEffect, useRef } from "react"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"

interface ChatWindowProps {
  messages: Array<IMessageBox>
  itemContent: (index: number, message: IMessageBox) => JSX.Element
  className?: string
  msgBoxClassName?: string
}

const ChatWindow = ({
  messages,
  itemContent,
  className,
  msgBoxClassName,
}: ChatWindowProps) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null) // Ref for Virtuoso

  useEffect(() => {
    if (virtuosoRef.current) {
      virtuosoRef.current.scrollToIndex({
        index: messages.length - 1,
        behavior: "smooth",
      })
    }
  }, [messages])

  return (
    <div
      className={twMerge(
        "h-full flex-1 rounded-[22px] border border-white bg-mercury-30 py-6",
        className,
      )}
    >
      <Virtuoso
        ref={virtuosoRef}
        data={messages}
        initialTopMostItemIndex={messages.length - 1}
        itemContent={(index, message) => {
          return (
            <article className={twMerge("px-6", msgBoxClassName)} key={index}>
              {itemContent(index, message)}
            </article>
          )
        }}
      />
    </div>
  )
}

export default ChatWindow
