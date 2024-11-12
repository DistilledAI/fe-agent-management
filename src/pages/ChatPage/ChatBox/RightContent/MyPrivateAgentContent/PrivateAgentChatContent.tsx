import { brainAIIcon } from "@assets/svg"
import ChatWindow from "@components/ChatWindow"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"
import useSubmitChat from "@hooks/useSubmitChat"
import useGetChatId from "@pages/ChatPage/Mobile/ChatDetail/useGetChatId"
import { useStyleSpacing } from "providers/StyleSpacingProvider"
import { useParams } from "react-router-dom"
import SpeechRecognition from "react-speech-recognition"
import ChatInput from "../../ChatInput"
import { IMessageBox, RoleChat } from "../../ChatMessages/helpers"
import useFetchMessages from "../../ChatMessages/useFetchMessages"
import { useQuery } from "@tanstack/react-query"

const PrivateAgentChatContent: React.FC<{
  hasInputChat?: boolean
}> = ({ hasInputChat = true }) => {
  const {
    isLoading,
    onLoadPrevMessages,
    messages,
    isFetched,
    isFetchingPreviousPage,
    hasPreviousMore,
  } = useFetchMessages()
  const { spacing } = useStyleSpacing()
  const { privateChatId } = useParams()
  const { chatId } = useGetChatId()
  const groupId = privateChatId || chatId
  const { mutation } = useSubmitChat(groupId, SpeechRecognition.stopListening)
  const { data: isChatting } = useQuery<boolean>({
    initialData: false,
    queryKey: ["isChatting", groupId],
    enabled: !!groupId,
  })

  const renderMessage = (_: number, message: IMessageBox) => {
    return (
      <div className="mx-auto w-full max-w-[768px] px-3 pb-4 max-md:px-4">
        {message.role === RoleChat.CUSTOMER ? (
          <ReceiverMessage
            avatar={{
              src: brainAIIcon,
              className: "bg-white p-1",
            }}
            content={message.content}
            isTyping={message.isTyping}
          />
        ) : null}
        {message.role === RoleChat.OWNER ? (
          <SenderMessage
            content={message.content}
            baseClassName="bg-lgd-code-agent-1 bg-mercury-950 text-white"
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
        onLoadPrevMessages={onLoadPrevMessages}
        chatId={privateChatId}
        isFetched={isFetched}
        hasPreviousMore={hasPreviousMore}
        isFetchingPreviousPage={isFetchingPreviousPage}
        style={{
          paddingBottom: `${spacing}px`,
        }}
      />
      {hasInputChat && (
        <ChatInput
          onSubmit={mutation.mutate}
          isPending={mutation.isPending}
          isDisabledInput={isChatting}
          wrapperClassName="left-1/2 -translate-x-1/2 w-[calc(100%-32px)]"
          isDarkTheme
        />
      )}
    </>
  )
}
export default PrivateAgentChatContent
