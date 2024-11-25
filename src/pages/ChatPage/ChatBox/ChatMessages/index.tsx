import ChatWindow from "@components/ChatWindow"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"
import { CLEAR_CACHED_MESSAGES, RoleUser } from "@constants/index"
import useGetChatId from "@pages/ChatPage/Mobile/ChatDetail/useGetChatId"
import { getActiveColorRandomById } from "@utils/index"
import { useStyleSpacing } from "providers/StyleSpacingProvider"
import { twMerge } from "tailwind-merge"
import ChatActions from "./ChatActions"
import {
  getBadgeColor,
  groupedMessages,
  IMessageBox,
  RoleChat,
} from "./helpers"
import useFetchMessages from "./useFetchMessages"
import AgentInfoCard from "./AgentInfoCard"
import ContextCleared from "@components/ContextCleared"

const ChatMessages = () => {
  const {
    isLoading,
    isFetched,
    onLoadPrevMessages,
    messages,
    hasPreviousMore,
    isFetchingPreviousPage,
  } = useFetchMessages()
  const { chatId } = useGetChatId()
  const { bgColor, textColor } = getActiveColorRandomById(chatId)
  const { spacing } = useStyleSpacing()

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

    if (message.content === CLEAR_CACHED_MESSAGES) {
      return (
        <ContextCleared
          wrapperClassName={twMerge(
            "max-w-[768px] mx-auto pb-4 px-3 md:px-0",
            messages.length - 1 === index && "pb-10",
          )}
          textClassName={textColor}
        />
      )
    }
    return (
      <div
        className={twMerge(
          "mx-auto w-full max-w-[768px] px-3 pb-4",
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
              publicAddress: message.publicAddress,
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
        Header={<AgentInfoCard messages={messages} />}
        messages={messages}
        itemContent={renderMessage}
        isLoading={isLoading}
        isFetched={isFetched}
        hasPreviousMore={hasPreviousMore}
        isFetchingPreviousPage={isFetchingPreviousPage}
        onLoadPrevMessages={onLoadPrevMessages}
        chatId={chatId}
        msgBoxClassName="p-0 md:px-4"
        style={{
          paddingBottom: `${spacing}px`,
        }}
        isChatActions={true}
      />
      <ChatActions />
    </>
  )
}

export default ChatMessages
