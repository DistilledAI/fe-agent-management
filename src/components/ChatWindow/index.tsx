import { Virtuoso, VirtuosoHandle } from "react-virtuoso"
import { twMerge } from "tailwind-merge"
import { useEffect, useRef } from "react"

interface ChatWindowProps {
  messages: Array<{ role: string; content: string }>
  itemContent: (
    index: number,
    message: { role: string; content: string },
  ) => JSX.Element
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
        "h-full flex-1 rounded-[22px] border-[2px] border-white bg-mercury-30 py-6",
        className,
      )}
    >
      <Virtuoso
        ref={virtuosoRef}
        data={messages}
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
