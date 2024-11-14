import { brainAIIcon } from "@assets/svg"
import ChatWindow from "@components/ChatWindow"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"
import useSubmitChat from "@hooks/useSubmitChat"
import useGetChatId from "@pages/ChatPage/Mobile/ChatDetail/useGetChatId"
import { useStyleSpacing } from "providers/StyleSpacingProvider"
import { Link, useParams } from "react-router-dom"
import SpeechRecognition from "react-speech-recognition"
import ChatInput from "../../ChatInput"
import { IMessageBox, RoleChat } from "../../ChatMessages/helpers"
import useFetchMessages from "../../ChatMessages/useFetchMessages"
import { useQuery } from "@tanstack/react-query"
import { InfoCircleIcon } from "@components/Icons/InfoCircleIcon"
import { QueryDataKeys } from "types/queryDataKeys"
import { PATH_NAMES, STATUS_AGENT } from "@constants/index"

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

  const { data } = useQuery<any>({
    queryKey: [QueryDataKeys.MY_BOT_LIST],
    refetchOnWindowFocus: false,
  })
  const agent = data?.data?.items?.[0]
  const isBotActive = agent && agent?.status === STATUS_AGENT.ACTIVE

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
        className={
          !isBotActive
            ? "max-h-[calc(100%-120px)] md:max-h-[calc(100%-190px)]"
            : ""
        }
      />
      {!isBotActive && (
        <div className="absolute bottom-[70px] left-1/2 w-[calc(100%-32px)] -translate-x-1/2 bg-white pb-0 md:bottom-[95px] md:pb-2">
          <div className="mx-auto flex w-full max-w-[768px] flex-col justify-between gap-1 rounded-lg border border-brown-500 bg-brown-50 px-4 py-3 md:flex-row md:items-center md:gap-2">
            <div className="flex items-center gap-2">
              <div>
                <InfoCircleIcon color="#83664B" size={16} />
              </div>
              <p className="text-brown-600 text-13 font-medium md:text-16">
                While your private agent is being created, you’ll be chatting
                with a default agent that doesn’t have your personalized
                intelligence.
              </p>
            </div>
            <div>
              <Link
                to={`${PATH_NAMES.MARKETPLACE}`}
                className="text-brown-600 ml-[22px] whitespace-nowrap text-13 font-bold hover:underline md:ml-0 md:text-16"
              >
                Chat with other agents
              </Link>
            </div>
          </div>
        </div>
      )}
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
