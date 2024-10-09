import ChatWindow from "@components/ChatWindow"
import ReceiverMessage from "@components/ReceiverMessage"
import { useParams } from "react-router-dom"
import { IMessageBox, RoleChat } from "../../ChatMessages/helpers"
import useFetchMessages from "../../ChatMessages/useFetchMessages"

const PrivateAgentChatContent: React.FC = () => {
  const { loading, onLoadPrevMessages } = useFetchMessages()
  const { chatId } = useParams()

  const renderMessage = (_: number, message: IMessageBox) => {
    return (
      <ReceiverMessage
        avatar={{ src: message.avatar, classNames: { base: "bg-white p-1" } }}
        content={message.content}
        isTyping={message.isTyping}
      />
    )
  }

  const defaultMessage = {
    id: "",
    role: RoleChat.CUSTOMER,
    content:
      "The system is being set up, and you will receive a notification via email once it's complete.",
    avatar: "/brain-ai.svg",
    isTyping: false,
    index: 0,
  }

  return (
    <ChatWindow
      messages={[defaultMessage]}
      itemContent={renderMessage}
      loading={loading}
      onLoadPrevMessages={onLoadPrevMessages}
      chatId={chatId}
    />
  )
}
export default PrivateAgentChatContent
