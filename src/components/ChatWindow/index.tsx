import { Virtuoso, VirtuosoHandle } from "react-virtuoso"
import { twMerge } from "tailwind-merge"
import { useEffect, useRef } from "react"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import ScrollToBottom, { useScrollToBottom } from "react-scroll-to-bottom"
import DotLoading from "@components/DotLoading"

interface ChatWindowProps {
  messages: Array<IMessageBox>
  itemContent: (index: number, message: IMessageBox) => JSX.Element
  className?: string
  msgBoxClassName?: string
  loading?: boolean
}

const ChatWindow = ({
  messages,
  itemContent,
  className,
  msgBoxClassName,
  loading,
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
        "flex-1, h-full rounded-[22px] border-[2px] border-white bg-mercury-30 p-3",
        className,
      )}
    >
      {loading ? (
        <div className="flex h-full items-center justify-center">
          <DotLoading />
        </div>
      ) : messages.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          NO MESSAGE
        </div>
      ) : (
        <Virtuoso
          style={{ height: "100%" }}
          ref={virtuosoRef}
          data={messages}
          initialTopMostItemIndex={messages.length - 1}
          itemContent={(index, message) => (
            <article
              className={twMerge(
                "px-3 pb-3",
                messages.length - 1 === index && "pb-3",
                msgBoxClassName,
              )}
              key={index}
            >
              {itemContent(index, message)}
            </article>
          )}
        />
      )}
    </ScrollToBottom>
  )
}

export default ChatWindow
