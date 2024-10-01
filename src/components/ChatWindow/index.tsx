import { Virtuoso, VirtuosoHandle } from "react-virtuoso"
import { twMerge } from "tailwind-merge"
import { useEffect, useRef } from "react"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import ScrollToBottom, { useScrollToBottom } from "react-scroll-to-bottom"

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
  const virtuosoRef = useRef<VirtuosoHandle>(null)
  const scrollToBottom = useScrollToBottom()

  useEffect(() => {
    if (virtuosoRef.current) {
      setTimeout(() => {
        if (virtuosoRef.current) {
          virtuosoRef.current.scrollToIndex({
            index: messages.length - 1,
            behavior: "smooth",
          })
        }
      }, 100)
    }

    scrollToBottom()
  }, [messages, scrollToBottom])

  return (
    <ScrollToBottom
      className={twMerge(
        "h-full flex-1 rounded-[22px] border-[2px] border-white bg-mercury-30 py-6",
        className,
      )}
    >
      <Virtuoso
        ref={virtuosoRef}
        data={messages}
        totalCount={messages.length}
        initialTopMostItemIndex={messages.length - 1}
        itemContent={(index, message) => (
          <article className={twMerge("px-6", msgBoxClassName)} key={index}>
            {itemContent(index, message)}
          </article>
        )}
      />
    </ScrollToBottom>
  )
}

export default ChatWindow
