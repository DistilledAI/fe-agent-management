import ChatWindow from "@components/ChatWindow"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"
import { RoleUser } from "@constants/index"
import { useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { useStyleBoxChat } from "../StyleProvider"
import {
  getBadgeColor,
  groupedMessages,
  IMessageBox,
  RoleChat,
} from "./helpers"
import useFetchMessages from "./useFetchMessages"
import { useMemo } from "react"
import ChatActions from "./ChatActions"
import { getActiveColorRandomById } from "@utils/index"
import ContextCleared from "@components/ContextCleared"
import { useQueryClient } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"

const ChatMessages = () => {
  const {
    isLoading,
    isFetched,
    onLoadPrevMessages,
    messages,
    hasPreviousMore,
    isFetchingPreviousPage,
  } = useFetchMessages()
  const { chatId } = useParams()
  const { style } = useStyleBoxChat()
  const { bgColor, textColor } = getActiveColorRandomById(chatId)
  const queryClient = useQueryClient()
  const myPrivateAgent = queryClient.getQueryData([
    QueryDataKeys.DELEGATE_PRIVATE_AGENT,
    chatId,
  ])

  const calculatedPaddingBottom = useMemo(() => {
    return `${style.paddingBottom}px`
  }, [style.paddingBottom])

  const getBadgeIcon = (role: RoleUser) =>
    role === RoleUser.BOT ? (
      <FilledBrainAIIcon size={14} />
    ) : (
      <FilledUserIcon size={14} />
    )

  const renderMessage = (index: number, message: IMessageBox) => {
    const { paddingBottomStyle, borderRadiusStyle } = groupedMessages(
      index,
      message,
      messages,
    )

    if (message.isChatCleared) {
      return (
        <div
          key={index}
          className="mx-auto flex max-w-[768px] justify-center pb-4"
        >
          <ContextCleared textClassName={textColor} />
        </div>
      )
    }

    return (
      <div
        className={twMerge(
          "mx-auto w-full max-w-[768px] scroll-smooth px-3 pb-4",
          message.role === RoleChat.OWNER && paddingBottomStyle,
        )}
        key={index}
      >
        {message.role === RoleChat.CUSTOMER ? (
          <ReceiverMessage
            avatar={{
              src: message.avatar,
              badgeIcon: getBadgeIcon(message.roleOwner),
              badgeClassName: getBadgeColor(message.roleOwner),
            }}
            content={message.content}
            isTyping={message.isTyping}
          />
        ) : null}
        {message.role === RoleChat.OWNER ? (
          <SenderMessage
            content={message.content}
            baseClassName={twMerge(bgColor, borderRadiusStyle)}
          />
        ) : null}
      </div>
    )
  }

  return (
    <>
      <ChatWindow
        messages={messages}
        itemContent={renderMessage}
        isLoading={isLoading}
        isFetched={isFetched}
        hasPreviousMore={hasPreviousMore}
        isFetchingPreviousPage={isFetchingPreviousPage}
        onLoadPrevMessages={onLoadPrevMessages}
        chatId={chatId}
        calculatedPaddingBottom={calculatedPaddingBottom}
        msgBoxClassName="p-0 md:px-4"
        isChatAction={!!myPrivateAgent}
      />
      <ChatActions />
    </>
  )
}

export default ChatMessages
