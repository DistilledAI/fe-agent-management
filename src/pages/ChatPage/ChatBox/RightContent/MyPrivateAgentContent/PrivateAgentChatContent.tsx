import ChatWindow from "@components/ChatWindow"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"
import { useChatMessage } from "providers/MessageProvider"
import { useParams } from "react-router-dom"
import { IMessageBox, RoleChat } from "../../ChatMessages/helpers"
import useFetchPrivateAgentMessages from "./useFetchPrivateAgentMessages"

const PrivateAgentChatContent: React.FC = () => {
  const { loading, onLoadPrevMessages } = useFetchPrivateAgentMessages()
  const { messages } = useChatMessage()
  const { privateChatId } = useParams()

  const renderMessage = (_: number, message: IMessageBox) => {
    return (
      <>
        {message.role === RoleChat.CUSTOMER ? (
          <ReceiverMessage
            avatar={{
              src: "/brain-ai.svg",
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
    />
  )
}
export default PrivateAgentChatContent
