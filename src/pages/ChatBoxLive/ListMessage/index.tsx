import ChatWindow from "@components/ChatWindow"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import useFetchMessages from "@pages/ChatPage/ChatBox/ChatMessages/useFetchMessages"
import React from "react"
import MessageLive from "../MessageLive"
import { twMerge } from "tailwind-merge"

const ListMessage: React.FC<{
  chatId: string
  onReply: (message: IMessageBox) => void
  isCloseLiveChat: boolean
  isClan: boolean
}> = ({ chatId, onReply, isCloseLiveChat, isClan }) => {
  const {
    isLoading,
    isFetched,
    onLoadPrevMessages,
    messages,
    hasPreviousMore,
    isFetchingPreviousPage,
  } = useFetchMessages()

  const renderMessage = (index: number, message: IMessageBox) => {
    return (
      <div
        className={twMerge(
          index === 0 && "pt-4",
          index === messages.length - 1 && "pb-56 md:pb-0",
        )}
      >
        <MessageLive
          key={index}
          message={message}
          onReply={() => onReply(message)}
          groupId={chatId}
        />
      </div>
    )
  }

  return !isCloseLiveChat ? (
    <ChatWindow
      messages={messages}
      itemContent={renderMessage}
      isLoading={isLoading}
      isFetched={isFetched}
      hasPreviousMore={hasPreviousMore}
      isFetchingPreviousPage={isFetchingPreviousPage}
      onLoadPrevMessages={onLoadPrevMessages}
      chatId={chatId}
      isChatActions={false}
      msgBoxClassName="p-0 px-4 pb-4"
      className={twMerge(
        "md:max-h-[calc(100%-80px)]",
        isClan && "md:max-h-[calc(100%-130px)]",
      )}
      scrollBottomClassName="max-md:!bottom-[200px] max-md:bg-none"
    />
  ) : null
}

export default ListMessage
