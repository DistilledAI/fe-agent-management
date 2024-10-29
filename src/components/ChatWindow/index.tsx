import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import React, {
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
import ScrollBottomChat from "./ScrollBottomChat"

interface ChatWindowProps {
  messages: Array<IMessageBox>
  itemContent: (index: number, message: IMessageBox) => JSX.Element
  className?: string
  isLoading?: boolean
  onLoadPrevMessages: () => Promise<number | undefined>
  chatId: string | undefined
  style?: CSSProperties
  msgBoxClassName?: string
  Footer?: React.ReactNode
  isFetched?: boolean
  hasPreviousMore?: boolean
  isFetchingPreviousPage?: boolean
  calculatedPaddingBottom?: string
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
  msgBoxClassName,
  isFetched = false,
  hasPreviousMore,
  isFetchingPreviousPage,
  calculatedPaddingBottom,
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
  }, [messages, isScrollBottom, chatId, calculatedPaddingBottom])

  const onScroll = useCallback(
    async (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
      if (scrollTop === 0 && hasPreviousMore) {
        setIsAtBottom(false)
        const messagesIndex = await onLoadPrevMessages()
        if (messagesIndex) {
          virtuosoRef.current?.scrollToIndex({
            index: messagesIndex || 0,
            behavior: "auto",
            align: "end",
          })
        }
      }

      const scrollPosition = scrollHeight - clientHeight - scrollTop
      setIsScrollBottom(scrollPosition > AT_BOTTOM_THRESHOLD)
    },
    [hasPreviousMore],
  )

  const memoizedHeader = useMemo(
    () => () =>
      isFetchingPreviousPage && messages.length >= LIMIT ? (
        <div className="my-4 flex h-full items-center justify-center">
          <DotLoading />
        </div>
      ) : (
        <></>
      ),
    [isFetchingPreviousPage, messages.length],
  )

  const renderEmptyPlaceholder = () =>
    isFetched && !messages.length ? (
      <div className="flex h-full items-center justify-center">NO MESSAGE</div>
    ) : (
      <></>
    )

  const row = useMemo(
    () => (index: number, message: IMessageBox) => {
      return (
        <article className={twMerge("px-3 pb-3", msgBoxClassName)} key={index}>
          {itemContent(index, message)}
        </article>
      )
    },
    [chatId, msgBoxClassName, itemContent],
  )

  return (
    <div
      className={twMerge(
        "relative h-full overflow-hidden transition-all duration-500 ease-linear",
        "max-h-[calc(100%-56px)] md:max-h-[calc(100%-152px)]",
        className,
      )}
      style={{
        paddingBottom: calculatedPaddingBottom,
      }}
    >
      {isLoading && <MessagesSkeleton />}
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
          increaseViewportBy={300}
          onScroll={messages.length >= LIMIT ? onScroll : undefined}
          components={{
            Header: memoizedHeader,
            EmptyPlaceholder: () => renderEmptyPlaceholder(),
          }}
          followOutput={isAtBottom ? "smooth" : false}
          atBottomStateChange={setIsAtBottom}
          atBottomThreshold={AT_BOTTOM_THRESHOLD}
          itemContent={row}
        />
      ) : null}
      <ScrollBottomChat
        isScrollBottom={isScrollBottom}
        virtuosoRef={virtuosoRef}
      />
    </div>
  )
}

export default ChatWindow
