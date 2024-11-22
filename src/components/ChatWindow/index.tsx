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
  msgBoxClassName?: string
  isFetched?: boolean
  hasPreviousMore?: boolean
  isFetchingPreviousPage?: boolean
  isChatAction?: boolean
  style?: CSSProperties
  Header?: React.ReactNode
  scrollBottomClassName?: string
  increaseViewportBy?: number
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
  isChatAction = false,
  style,
  Header,
  scrollBottomClassName,
  increaseViewportBy = 500,
}: ChatWindowProps) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null)
  // const [isAtBottom, setIsAtBottom] = useState<boolean>(true)
  const [isScrollBottom, setIsScrollBottom] = useState<boolean>(false)

  useLayoutEffect(() => {
    if (chatId) {
      setIsScrollBottom(false)
      // setIsAtBottom(true)
    }
  }, [chatId])

  useEffect(() => {
    if (!isScrollBottom) {
      virtuosoRef.current?.scrollToIndex({
        index: messages.length - 1,
        behavior: "auto",
        align: style?.paddingBottom === "0px" ? "end" : "center",
      })
    }
  }, [messages, isScrollBottom, style?.paddingBottom, chatId])

  const onScroll = useCallback(
    async (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
      if (scrollTop === 0 && hasPreviousMore) {
        // setIsAtBottom(false)
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

  const renderHeader = useMemo(
    () => () => {
      return (
        <>
          {isFetchingPreviousPage && messages.length >= LIMIT ? (
            <div className="flex h-full items-center justify-center py-6">
              <DotLoading />
            </div>
          ) : (
            <></>
          )}
          {Header ? <div className="pb-4">{Header}</div> : <></>}
        </>
      )
    },
    [isFetchingPreviousPage, messages.length, Header],
  )

  const renderEmptyPlaceholder = () =>
    isFetched && !messages.length ? (
      <div className="flex h-full items-center justify-center">NO MESSAGE</div>
    ) : (
      <></>
    )

  const renderRow = useMemo(
    () => (index: number, message: IMessageBox) => {
      return (
        <article className={twMerge("px-3 pb-3", msgBoxClassName)} key={index}>
          {itemContent(index, message)}
        </article>
      )
    },
    [msgBoxClassName, chatId, itemContent],
  )

  return (
    <div
      className={twMerge(
        "relative h-full overflow-hidden md:max-h-[calc(100%-100px)]",
        isChatAction && "max-h-[calc(100%-56px)] md:max-h-[calc(100%-152px)]",
        className,
      )}
      style={style}
    >
      {isLoading && <MessagesSkeleton />}
      {!isLoading && messages.length ? (
        <Virtuoso
          id="chat-window"
          style={{
            height: "100%",
          }}
          ref={virtuosoRef}
          data={messages}
          initialTopMostItemIndex={{
            index: "LAST",
            align: "end",
          }}
          totalCount={messages.length}
          increaseViewportBy={increaseViewportBy}
          onScroll={messages.length >= LIMIT ? onScroll : undefined}
          components={{
            Header: renderHeader,
            EmptyPlaceholder: () => renderEmptyPlaceholder(),
          }}
          followOutput={"auto"}
          // atBottomStateChange={setIsAtBottom}
          atBottomThreshold={AT_BOTTOM_THRESHOLD}
          itemContent={renderRow}
        />
      ) : null}
      <ScrollBottomChat
        scrollBottomClassName={scrollBottomClassName}
        isScrollBottom={isScrollBottom}
        virtuosoRef={virtuosoRef}
      />
    </div>
  )
}

export default ChatWindow
