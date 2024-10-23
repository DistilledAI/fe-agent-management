import ChatWindow from "@components/ChatWindow"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"
import { useParams } from "react-router-dom"
import { IMessageBox, RoleChat } from "../../ChatMessages/helpers"
import { brainAIIcon } from "@assets/svg"
import useFetchMessages from "../../ChatMessages/useFetchMessages"

const PrivateAgentChatContent: React.FC = () => {
  const { loading, onLoadPrevMessages, messages, isFetched } =
    useFetchMessages()
  const { privateChatId } = useParams()

  const renderMessage = (_: number, message: IMessageBox) => {
    return (
      <>
        {message.role === RoleChat.CUSTOMER ? (
          <ReceiverMessage
            avatar={{
              src: brainAIIcon,
              classNames: { base: "bg-white p-1" },
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
      </>
    )
  }

  return (
    <ChatWindow
      messages={messages}
      itemContent={renderMessage}
      loading={loading}
      onLoadPrevMessages={onLoadPrevMessages}
      chatId={privateChatId}
      isFetched={isFetched}
    />
  )
}
export default PrivateAgentChatContent
