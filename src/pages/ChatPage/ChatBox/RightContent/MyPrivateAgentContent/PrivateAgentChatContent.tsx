import ChatWindow from "@components/ChatWindow"
import ReceiverMessage from "@components/ReceiverMessage"
import { useParams } from "react-router-dom"
import { IMessageBox, RoleChat } from "../../ChatMessages/helpers"
// import { RoleUser } from "@constants/index"
import { useChatMessage } from "providers/MessageProvider"
import useFetchPrivateAgentMessages from "./useFetchPrivateAgentMessages"
import SenderMessage from "@components/SenderMessage"

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

  // const defaultMessage = {
  //   id: "0",
  //   role: RoleChat.CUSTOMER,
  //   content:
  //     "Hi, I am your Private agent. I’d be happy to help you with everything!",
  //   avatar: "/brain-ai.svg",
  //   isTyping: false,
  //   index: 0,
  //   roleOwner: RoleUser.BOT,
  // }

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
