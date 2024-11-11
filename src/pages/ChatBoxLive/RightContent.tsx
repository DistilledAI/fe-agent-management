import ChatWindow from "@components/ChatWindow"
import { useAppSelector } from "@hooks/useAppRedux"
import useAuthState from "@hooks/useAuthState"
import useSubmitChat from "@hooks/useSubmitChat"
import useWindowSize from "@hooks/useWindowSize"
import ChatInput from "@pages/ChatPage/ChatBox/ChatInput"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import useFetchMessages from "@pages/ChatPage/ChatBox/ChatMessages/useFetchMessages"
import useGetChatId from "@pages/ChatPage/Mobile/ChatDetail/useGetChatId"
import { useQuery } from "@tanstack/react-query"
import SpeechRecognition from "react-speech-recognition"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"
import MessageLive from "./MessageLive"
import ToggleActionsMobile from "./ToggleActionsMobile"

const RightContent = () => {
  const { isMobile } = useWindowSize()
  const { isLogin } = useAuthState()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  const { chatId } = useGetChatId()
  const { mutation } = useSubmitChat(chatId, SpeechRecognition.stopListening)
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
        className={twMerge(index === messages.length - 1 && "pb-24 md:pb-0")}
      >
        <MessageLive key={index} message={message} />
      </div>
    )
  }

  return (
    <div
      className={twMerge(
        "flex-1 transition-all duration-300 ease-linear",
        "bg-white max-md:rounded-[14px] max-md:border-t max-md:border-t-white max-md:shadow-7",
        "md:px-10",
        "max-2xl:px-0",
        isCloseLiveChat && "h-[113px] flex-none md:flex-1",
      )}
    >
      {isMobile ? <ToggleActionsMobile /> : <></>}

      <ChatWindow
        messages={messages}
        itemContent={renderMessage}
        isLoading={isLoading}
        isFetched={isFetched}
        hasPreviousMore={hasPreviousMore}
        isFetchingPreviousPage={isFetchingPreviousPage}
        onLoadPrevMessages={onLoadPrevMessages}
        chatId={chatId}
        isChatAction={false}
        msgBoxClassName="p-0 px-4 pb-4"
        className={twMerge(
          "h-full md:max-h-[calc(100%-80px)]",
          isCloseLiveChat && "opacity-0 delay-300",
        )}
        scrollBottomClassName="max-md:!bottom-[93px] max-md:bg-none"
        increaseViewportBy={1000}
      />
      <div
        className={twMerge(
          "relative pt-3 duration-300",
          "max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:bg-fading-white max-md:px-4 md:bg-white",
          "max-lg:fixed max-lg:bottom-0 max-lg:left-[344px] max-lg:right-4 max-lg:pb-4",
          sidebarCollapsed && "max-lg:left-[121px]",
        )}
      >
        <div className="absolute inset-x-0 bottom-[calc(100%-5px)] hidden h-6 w-full bg-fading-white md:block" />
        <ChatInput
          onSubmit={mutation.mutate}
          isPending={mutation.isPending}
          isDisabledInput={!isEnableTextInput}
          wrapperClassName="w-full static max-w-full"
        />
      </div>
    </div>
  )
}
export default RightContent
