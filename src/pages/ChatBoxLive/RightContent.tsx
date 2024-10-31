import ChatWindow from "@components/ChatWindow"
import { useAppSelector } from "@hooks/useAppRedux"
import ChatInput from "@pages/ChatPage/ChatBox/ChatInput"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import useFetchMessages from "@pages/ChatPage/ChatBox/ChatMessages/useFetchMessages"
import { twMerge } from "tailwind-merge"
import MessageLive from "./MessageLive"

const RightContent: React.FC = () => {
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)

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
      <div className={twMerge("mb-5", index === messages.length - 1 && "pb-4")}>
        <MessageLive message={message} />
      </div>
    )
  }

  const onSubmit = () => {}

  return (
    <div className="flex-1 px-10 max-2xl:px-0 max-lg:h-[300px] max-lg:flex-none max-md:h-[250px]">
      <ChatWindow
        messages={messages}
        itemContent={renderMessage}
        isLoading={isLoading}
        isFetched={isFetched}
        hasPreviousMore={hasPreviousMore}
        isFetchingPreviousPage={isFetchingPreviousPage}
        onLoadPrevMessages={onLoadPrevMessages}
        chatId={"1"}
        msgBoxClassName="p-0 md:px-4"
        isChatAction={false}
        className="max-lg:!max-h-full md:max-h-[calc(100%-80px)]"
      />
      <div
        className={twMerge(
          "relative bg-white pt-3 duration-300 max-lg:fixed max-lg:bottom-0 max-lg:left-[344px] max-lg:right-4 max-lg:pb-4 max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:px-4",
          sidebarCollapsed && "max-lg:left-[121px]",
        )}
      >
        <div className="absolute bottom-[calc(100%-5px)] h-6 w-full bg-fading-white"></div>
        <ChatInput
          onSubmit={onSubmit}
          isPending={false}
          isDisabledInput={false}
          wrapperClassName="w-full static max-w-full"
        />
      </div>
    </div>
  )
}
export default RightContent
