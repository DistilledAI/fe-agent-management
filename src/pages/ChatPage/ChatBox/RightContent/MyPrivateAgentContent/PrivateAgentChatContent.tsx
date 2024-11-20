import { brainAIIcon } from "@assets/svg"
import ChatWindow from "@components/ChatWindow"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"
import useSubmitChat from "@hooks/useSubmitChat"
import { useStyleSpacing } from "providers/StyleSpacingProvider"
import { useParams } from "react-router-dom"
import SpeechRecognition from "react-speech-recognition"
import ChatInput from "../../ChatInput"
import { IMessageBox, RoleChat } from "../../ChatMessages/helpers"
import useFetchMessages from "../../ChatMessages/useFetchMessages"
import { useQuery } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"
import { PATH_NAMES, STATUS_AGENT } from "@constants/index"
import useFetchMyData from "@pages/MyData/useFetch"
import AlertBox from "@components/AlertBox"

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
  const groupId = privateChatId
  const { mutation } = useSubmitChat(groupId, SpeechRecognition.stopListening)
  const { list: listMyData, isFetched: isFetchedMyData } = useFetchMyData()
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
  const isShowAddData =
    listMyData.length === 0 && isFetchedMyData && isBotActive

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
          <AlertBox
            className="mx-auto max-w-[768px]"
            isVisible={true}
            messages={[
              "While your private agent is being created, you’ll be chatting with a default agent that doesn’t have your personalized intelligence.",
            ]}
            links={[
              { to: PATH_NAMES.MARKETPLACE, label: "Chat with other agents" },
            ]}
          />
        </div>
      )}
      {isShowAddData && (
        <div className="absolute bottom-[70px] left-1/2 w-[calc(100%-32px)] -translate-x-1/2 bg-white pb-0 md:bottom-[95px] md:pb-2">
          <AlertBox
            className="mx-auto max-w-[768px]"
            isVisible={true}
            messages={[
              "Since no data has been added, your agent lacks personalized intelligence.",
              "Please add your data to help your agent learn more about you.",
            ]}
            links={[{ to: PATH_NAMES.ADD_MY_DATA, label: "Add Data" }]}
          />
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
