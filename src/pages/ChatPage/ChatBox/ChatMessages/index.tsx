import ChatWindow from "@components/ChatWindow"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"
import { IMessageBox, RoleChat } from "./helpers"
import { useChatMessage } from "providers/MessageProvider"
import useFetchMessages from "./useFetchMessages"
import useMessageSocket from "./useMessageSocket"

const ChatMessages = () => {
  const { messages, setMessages } = useChatMessage()
  const { loading } = useFetchMessages()
  useMessageSocket(setMessages)

  const renderMessage = (_: number, message: IMessageBox) => {
    return (
      <>
        {message.role === RoleChat.CUSTOMER ? (
          <ReceiverMessage
            avatar={{ src: message.avatar }}
            content={message.content}
          />
        ) : null}
        {message.role === RoleChat.OWNER ? (
          <SenderMessage
            content={message.content}
            baseClassName="bg-lgd-code-agent-1"
          />
        ) : null}
      </>
    )
  }

  return (
    <ChatWindow
      className="border-code-agent-1"
      messages={messages}
      itemContent={renderMessage}
      loading={loading}
    />
  )
}

export default ChatMessages
