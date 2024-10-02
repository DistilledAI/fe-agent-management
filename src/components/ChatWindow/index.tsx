import { Virtuoso, VirtuosoHandle } from "react-virtuoso"
import { twMerge } from "tailwind-merge"
import { useRef, useState } from "react"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import DotLoading from "@components/DotLoading"

interface ChatWindowProps {
  messages: Array<IMessageBox>
  itemContent: (index: number, message: IMessageBox) => JSX.Element
  className?: string
  msgBoxClassName?: string
  loading?: boolean
  onLoadPrevMessages: (params: {
    offset: number
    limit?: number
  }) => Promise<number> // return index message on loaded or undefined when no more messages
}

const LIMIT = 20

const ChatWindow = ({
  messages,
  itemContent,
  className,
  msgBoxClassName,
  loading,
  onLoadPrevMessages,
}: ChatWindowProps) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null)
  const [offset, setOffset] = useState(LIMIT)
  const [hasMoreMessages, setHasMoreMessages] = useState(true)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const lastMsgIndex = messages.length - 1

  const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop

    if (scrollTop === 0 && !loading && hasMoreMessages) {
      setIsLoadMore(true)
      setIsAtBottom(false)

      const prevMessageIndex = await onLoadPrevMessages({
        offset,
        limit: LIMIT,
      })

      setIsLoadMore(false)

      if (!prevMessageIndex) {
        setHasMoreMessages(false)
      } else {
        setOffset((prev) => prev + LIMIT)

        if (prevMessageIndex !== undefined) {
          virtuosoRef.current?.scrollToIndex({
            index: prevMessageIndex,
            behavior: "auto",
          })
        }
      }
    }
  }

  const renderDotLoading = (className?: string) => {
    return (
      <div
        className={twMerge(
          "flex h-full items-center justify-center",
          className,
        )}
      >
        <DotLoading />
      </div>
    )
  }

  return (
    <div
      className={twMerge(
        "h-full flex-1 scroll-smooth rounded-[22px] border-[2px] border-white bg-mercury-30 p-3",
        className,
      )}
    >
      {loading && renderDotLoading()}
      {!loading && !messages.length && (
        <div className="flex h-full items-center justify-center">
          NO MESSAGE
        </div>
      )}
      {messages.length && (
        <Virtuoso
          style={{ height: "100%" }}
          ref={virtuosoRef}
          data={messages}
          initialTopMostItemIndex={lastMsgIndex}
          onScroll={handleScroll}
          components={{
            Header: () => (isLoadMore ? renderDotLoading("my-4") : <></>),
          }}
          followOutput={() => {
            if (isAtBottom) {
              return "smooth"
            }
            return false
          }}
          atBottomStateChange={(atBottom) => setIsAtBottom(atBottom)}
          atBottomThreshold={300}
          itemContent={(index, message) => (
            <article
              className={twMerge(
                "px-3 pb-3",
                lastMsgIndex === index && "pb-3",
                msgBoxClassName,
              )}
              key={index}
            >
              {itemContent(index, message)}
            </article>
          )}
        />
      )}
    </div>
  )
}

export default ChatWindow
