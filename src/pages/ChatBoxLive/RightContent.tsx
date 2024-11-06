import ChatWindow from "@components/ChatWindow"
import { ArrowsBarToUpIcon } from "@components/Icons/Arrow"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { useAppSelector } from "@hooks/useAppRedux"
import useAuthState from "@hooks/useAuthState"
import useSubmitChat from "@hooks/useSubmitChat"
import ChatInput from "@pages/ChatPage/ChatBox/ChatInput"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import useFetchMessages from "@pages/ChatPage/ChatBox/ChatMessages/useFetchMessages"
import useGetChatId from "@pages/ChatPage/Mobile/ChatDetail/useGetChatId"
import SpeechRecognition from "react-speech-recognition"
import { twMerge } from "tailwind-merge"
import MessageLive from "./MessageLive"

const RightContent: React.FC = () => {
  const { isLogin } = useAuthState()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  const { chatId } = useGetChatId()
  const { mutation } = useSubmitChat(chatId, SpeechRecognition.stopListening)
  const isEnableTextInput = isLogin && chatId

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
        "flex-1",
        "max-md:shadow-7 max-md:rounded-[14px] max-md:border-t max-md:border-t-white max-md:bg-mercury-30",
        "md:px-10",
        "max-2xl:px-0",
      )}
    >
      <div className="flex items-center justify-between border-b border-b-mercury-100 px-4 py-2 md:hidden">
        <h4 className="text-16 font-bold text-mercury-950">Live Chat</h4>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-full p-[5.5px] hover:bg-mercury-30"
          >
            <ArrowsBarToUpIcon />
          </button>
          <button
            type="button"
            className="rounded-full p-[5.5px] hover:bg-mercury-30"
          >
            <CloseFilledIcon />
          </button>
        </div>
      </div>
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
        msgBoxClassName="p-0 px-6 pb-6 md:px-4 md:pb-4"
        className="h-full md:max-h-[calc(100%-80px)]"
        scrollBottomClassName="max-md:!bottom-[93px] max-md:bg-none"
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
