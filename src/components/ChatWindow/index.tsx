import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import { Button } from "@nextui-org/react"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Virtuoso, VirtuosoHandle } from "react-virtuoso"
import { twMerge } from "tailwind-merge"
import MessagesSkeleton from "./MessagesSkeleton"
import DotLoading from "@components/DotLoading"

interface ChatWindowProps {
  messages: Array<IMessageBox>
  itemContent: (index: number, message: IMessageBox) => JSX.Element
  className?: string
  isLoading?: boolean
  onLoadPrevMessages: () => Promise<number | undefined>
  chatId: string | undefined
  style?: CSSProperties
  msgBoxClassName?: string
  children?: React.ReactNode
  Footer?:
    | React.ComponentType<{
        context?: any
      }>
    | undefined
  isFetched?: boolean
  hasPreviousMore?: boolean
  isFetchingPreviousPage?: boolean
}

const LIMIT = 20
const AT_BOTTOM_THRESHOLD = 200

const ChatWindow = ({
  messages,
  itemContent,
  className,
  isLoading,
  chatId,
  onLoadPrevMessages,
  style,
  msgBoxClassName,
  children,
  Footer,
  isFetched = false,
  hasPreviousMore,
  isFetchingPreviousPage,
}: ChatWindowProps) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null)
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true)
  const [isScrollBottom, setIsScrollBottom] = useState<boolean>(false)

  useLayoutEffect(() => {
    if (chatId) {
      setIsScrollBottom(false)
      setIsAtBottom(true)
    }
  }, [chatId])

  useEffect(() => {
    if (!isScrollBottom) {
      virtuosoRef.current?.scrollToIndex({
        index: messages.length - 1,
        behavior: "auto",
        align: "end",
      })
    }
  }, [messages, isScrollBottom, chatId])

  const onScroll = useCallback(
    async (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
      if (scrollTop === 0 && hasPreviousMore) {
        setIsAtBottom(false)
        const messagesIndex = await onLoadPrevMessages()

        virtuosoRef.current?.scrollToIndex({
          index: messagesIndex || 0,
          behavior: "auto",
        })
      }

      const scrollPosition = scrollHeight - clientHeight - scrollTop
      setIsScrollBottom(scrollPosition > AT_BOTTOM_THRESHOLD)
    },
    [hasPreviousMore],
  )

  const onScrollToBottom = () => {
    virtuosoRef.current?.scrollToIndex({
      index: "LAST",
      behavior: "smooth",
      align: "end",
    })
  }

  const memoizedFooter = useMemo(() => Footer, [])

  const renderLoadMore = () => {
    return (
      <div className="my-4 flex h-full items-center justify-center">
        <DotLoading />
      </div>
    )
  }

  return (
    <div
      style={style}
      className={twMerge(
        "relative h-full overflow-hidden transition-all duration-500 ease-in-out md:max-h-[calc(100%-100px)]",
        className,
      )}
    >
      {isLoading && <MessagesSkeleton />}
      {isFetched && !messages.length && (
        <div className="flex h-full items-center justify-center">
          NO MESSAGE
        </div>
      )}
      {!isLoading && messages.length ? (
        <Virtuoso
          style={{
            height: "100%",
          }}
          ref={virtuosoRef}
          data={messages}
          initialTopMostItemIndex={{
            index: messages.length - 1,
            align: "end",
          }}
          increaseViewportBy={600}
          onScroll={onScroll}
          components={{
            Header: () =>
              isFetchingPreviousPage && messages.length >= LIMIT ? (
                renderLoadMore()
              ) : (
                <></>
              ),
            Footer: memoizedFooter,
          }}
          followOutput={isAtBottom ? "smooth" : false}
          atBottomStateChange={setIsAtBottom}
          atBottomThreshold={AT_BOTTOM_THRESHOLD}
          itemContent={(index, message) => (
            <article
              className={twMerge("px-3 pb-3", msgBoxClassName)}
              key={index}
            >
              {itemContent(index, message)}
            </article>
          )}
        />
      ) : null}
      {isScrollBottom && (
        <div className="absolute inset-x-0 bottom-0 z-10 flex h-20 w-full items-center justify-center bg-fading-white bg-cover bg-no-repeat">
          <Button
            onClick={onScrollToBottom}
            className={twMerge(
              "w-10 min-w-10 rounded-full border border-mercury-900 bg-mercury-950 px-4 py-2",
              // isNewMsgOnCurrentWindow && "w-fit",
            )}
          >
            <div className="rotate-180">
              <ArrowUpFilledIcon />
            </div>
            {/* <span
              className={twMerge(
                "hidden",
                isNewMsgOnCurrentWindow && "block text-mercury-30",
              )}
            >
              New message
            </span> */}
          </Button>
        </div>
      )}
      {children}
    </div>
  )
}

export default ChatWindow
