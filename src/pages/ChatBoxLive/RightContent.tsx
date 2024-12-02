import ChatWindow from "@components/ChatWindow"
import { useAppSelector } from "@hooks/useAppRedux"
import useAuthState from "@hooks/useAuthState"
import useSubmitChat from "@hooks/useSubmitChat"
import useWindowSize from "@hooks/useWindowSize"
import ClanShortInfo from "@pages/AgentClan/ClanShortInfo"
import ChatInput from "@pages/ChatPage/ChatBox/ChatInput"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import useFetchMessages from "@pages/ChatPage/ChatBox/ChatMessages/useFetchMessages"
import useGetChatId from "@pages/ChatPage/Mobile/ChatDetail/useGetChatId"
import { useQuery } from "@tanstack/react-query"
import React, { useState } from "react"
import SpeechRecognition from "react-speech-recognition"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import MessageLive from "./MessageLive"
import ToggleActionsMobile from "./ToggleActionsMobile"
import TradeTokenButton from "./TradeTokenButton"
import { UserGroup } from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"

const RightContent: React.FC<{
  isClan?: boolean
  groupDetail?: UserGroup | null
}> = ({ isClan = false, groupDetail }) => {
  const { isMobile } = useWindowSize()
  const { isLogin } = useAuthState()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  const { chatId } = useGetChatId()
  const [replyUsername, setReplyUsername] = useState<string | null>(null)
  const [replyId, setReplyId] = useState<number>()
  const [replyTxt, setReplyTxt] = useState<string>("")
  const [hasFocus, setHasFocus] = useState(false)
  const isMaxi =
    groupDetail?.group.label === "@maxisbuyin" ||
    groupDetail?.group.label === "@maxisbuyin_"
  const resetReply = () => {
    setReplyId(undefined)
    setReplyUsername(null)
    setReplyTxt("")
  }
  const { mutation } = useSubmitChat({
    callbackDone: () => {
      SpeechRecognition.stopListening()
      resetReply()
    },
    groupId: chatId,
    reply: replyId
      ? {
          messageId: replyId,
          message: replyTxt,
          username: replyUsername ?? "",
        }
      : undefined,
    isClan,
  })
  const isEnableTextInput = isLogin && chatId
  const { data: isCloseLiveChat = false } = useQuery<boolean>({
    queryKey: [QueryDataKeys.CLOSE_LIVE_CHAT],
  })

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
          index === messages.length - 1 && "pb-24 md:pb-0",
        )}
      >
        <MessageLive
          key={index}
          message={message}
          onReply={() => {
            setHasFocus(true)
            setReplyId(message.id as number)
            setReplyTxt(message.content)
            setReplyUsername(
              message.username ? `@${message.username} ` : "@Unnamed ",
            )
          }}
        />
      </div>
    )
  }

  return (
    <div
      className={twMerge(
        "flex-1",
        "bg-white max-md:rounded-[14px] max-md:border-t max-md:border-t-white max-md:shadow-7",
        "md:px-10",
        "max-2xl:px-0",
        isCloseLiveChat && "h-[113px] flex-none md:flex-1",
      )}
    >
      {isMobile ? <ToggleActionsMobile /> : <></>}
      {!isMobile && isClan && <ClanShortInfo />}
      {!isCloseLiveChat ? (
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
          increaseViewportBy={3000}
        />
      ) : (
        <></>
      )}

      <div
        className={twMerge(
          "relative pt-3 duration-300",
          "max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:bg-fading-white max-md:px-4 md:bg-white",
          "max-lg:fixed max-lg:bottom-0 max-lg:left-[344px] max-lg:right-4 max-lg:pb-4",
          sidebarCollapsed && "max-lg:left-[121px]",
        )}
      >
        <div className="absolute inset-x-0 bottom-[calc(100%-5px)] hidden h-6 w-full bg-fading-white md:block" />
        <div className={twMerge("flex items-center", isMaxi && "gap-1")}>
          <div className="md:hidden">
            <TradeTokenButton isMaxi={isMaxi} />
          </div>
          <ChatInput
            onSubmit={mutation.mutate}
            isPending={mutation.isPending}
            isDisabledInput={!isEnableTextInput}
            replyUsername={replyUsername}
            hasFocus={hasFocus}
            setHasFocus={setHasFocus}
            resetRely={resetReply}
            wrapperClassName="w-full static max-w-full max-md:pl-3"
          />
        </div>
      </div>
    </div>
  )
}
export default RightContent
