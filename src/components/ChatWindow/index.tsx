import { Virtuoso, VirtuosoHandle } from "react-virtuoso"
import { twMerge } from "tailwind-merge"
import { useLayoutEffect, useRef, useState } from "react"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import DotLoading from "@components/DotLoading"
import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import { Button } from "@nextui-org/react"

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
  chatId: string | undefined
}

const LIMIT = 20

const ChatWindow = ({
  messages,
  itemContent,
  className,
  msgBoxClassName,
  loading,
  chatId,
  onLoadPrevMessages,
}: ChatWindowProps) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null)
  const [offset, setOffset] = useState(LIMIT)
  const [hasMoreMessages, setHasMoreMessages] = useState(true)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [isScrollBottom, setIsScrollBottom] = useState(false)
  const lastMsgIndex = messages.length - 1

  useLayoutEffect(() => {
    if (chatId) {
      setHasMoreMessages(true)
    }
  }, [chatId])

  const onScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop
    const scrollHeight = e.currentTarget.scrollHeight
    const clientHeight = e.currentTarget.clientHeight

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

    const scrollPosition = scrollHeight - clientHeight - scrollTop

    if (scrollPosition > 300) {
      setIsScrollBottom(true)
    } else {
      setIsScrollBottom(false)
    }
  }

  const onScrollToBottom = () => {
    virtuosoRef.current?.scrollToIndex({
      index: "LAST",
      behavior: "smooth",
    })
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
        "relative h-full flex-1 overflow-hidden scroll-smooth rounded-[22px] border-[2px] border-white bg-mercury-30 p-3",
        className,
      )}
    >
      {loading && renderDotLoading()}
      {!loading && !messages.length && (
        <div className="flex h-full items-center justify-center">
          NO MESSAGE
        </div>
      )}
      {!loading && messages.length ? (
        <Virtuoso
          style={{ height: "100%" }}
          ref={virtuosoRef}
          data={messages}
          initialTopMostItemIndex={lastMsgIndex}
          onScroll={onScroll}
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
      ) : null}
      {isScrollBottom && (
        <div className="bg-fading-white absolute bottom-0 z-10 flex h-20 w-full items-center justify-center overflow-hidden bg-cover bg-no-repeat">
          <Button
            onClick={onScrollToBottom}
            className="w-10 min-w-10 rounded-full border border-mercury-900 bg-mercury-950 px-4 py-2"
          >
            <div className="rotate-180">
              <ArrowUpFilledIcon />
            </div>
          </Button>
        </div>
      )}
    </div>
  )
}

export default ChatWindow
