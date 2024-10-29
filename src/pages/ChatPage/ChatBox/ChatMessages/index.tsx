import ChatWindow from "@components/ChatWindow"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"
import { RoleUser } from "@constants/index"
import { useParams } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import { useStyleBoxChat } from "../StyleProvider"
import { IMessageBox, RoleChat } from "./helpers"
import useFetchMessages from "./useFetchMessages"
import { useMemo } from "react"
import ChatActions from "./ChatActions"
import { getActiveColorRandomById } from "@utils/index"

const TIME_BREAK = 10

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

  const calculatedPaddingBottom = useMemo(() => {
    return `${style.paddingBottom}px`
  }, [style.paddingBottom])

  const getBadgeIcon = (role: RoleUser) =>
    role === RoleUser.BOT ? (
      <FilledBrainAIIcon size={14} />
    ) : (
      <FilledUserIcon size={14} />
    )

  const getBadgeColor = (role: RoleUser) =>
    role === RoleUser.BOT ? "bg-[#FC0]" : "bg-[#0FE9A4]"

  const getTimeDiff = (date1: string, date2: string): number => {
    const time1 = new Date(date1).getTime()
    const time2 = new Date(date2).getTime()

    return (time1 - time2) / 1000
  }

  const groupedMessages = (
    index: number,
    message: IMessageBox,
    messages: IMessageBox[],
  ) => {
    let groupType = "none"
    const prevMsg = messages[index - 1]
    const nextMsg = messages[index + 1]

    const prevTimeDiff = getTimeDiff(message?.createdAt, prevMsg?.createdAt)
    const nextTimeDiff = getTimeDiff(nextMsg?.createdAt, message?.createdAt)

    if (message.role === RoleChat.OWNER) {
      if (prevMsg && prevMsg.role === RoleChat.OWNER) {
        if (prevTimeDiff < TIME_BREAK) {
          if (
            nextMsg &&
            nextMsg.role === RoleChat.OWNER &&
            nextTimeDiff < TIME_BREAK
          ) {
            groupType = "middle"
          } else {
            groupType = "bottom"
          }
        } else {
          groupType = "top"
          if (
            !nextMsg ||
            nextMsg.role !== message.role ||
            nextTimeDiff > TIME_BREAK
          ) {
            groupType = "none"
          }
        }
      } else {
        groupType =
          nextMsg &&
          nextMsg.role === RoleChat.OWNER &&
          nextTimeDiff < TIME_BREAK
            ? "top"
            : "none"
      }
    }

    const borderRadiusStyle = {
      none: "",
      top: "rounded-t-[20px] rounded-bl-[20px] rounded-br",
      middle: "rounded-tr rounded-br rounded-tl-[20px] rounded-bl-[20px]",
      bottom: "rounded-tr",
    }[groupType]

    const paddingBottomStyle = {
      none: "pb-4",
      top: "pb-[3px]",
      middle: "pb-[3px]",
      bottom: "pb-4",
    }[groupType]

    return {
      borderRadiusStyle,
      paddingBottomStyle,
    }
  }

  const renderMessage = (index: number, message: IMessageBox) => {
    const { paddingBottomStyle, borderRadiusStyle } = groupedMessages(
      index,
      message,
      messages,
    )
    if (message.isChatCleared) {
      return (
        <div
          className={twMerge(
            "mx-auto flex max-w-[768px] justify-center pb-4 transition-all duration-300",
          )}
        >
          <div className="flex h-fit w-full items-center justify-center gap-x-3">
            <div className="h-[1px] flex-1 bg-mercury-100" />
            <span
              className={twMerge(
                "text-14 font-bold text-mercury-950",
                textColor,
              )}
            >
              Context cleared
            </span>
            <div className="h-[1px] flex-1 bg-mercury-100" />
          </div>
        </div>
      )
    }

    return (
      <>
        <div
          className={twMerge(
            "mx-auto w-full max-w-[768px] scroll-smooth px-3 pb-4 max-sm:px-3",
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
      </>
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
      />
      <ChatActions />
    </>
  )
}

export default ChatMessages
