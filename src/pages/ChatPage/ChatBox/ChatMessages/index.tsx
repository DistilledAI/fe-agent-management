import ChatWindow from "@components/ChatWindow"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"
import { IMessageBox, RoleChat } from "./helpers"

const ChatMessages = ({ data }: { data: IMessageBox[] }) => {
  const renderMessage = (_: number, message: IMessageBox) => {
    return (
      <>
        {message.role === RoleChat.CUSTOMER ? (
          <ReceiverMessage
            avatar={{
              src: "https://assets.coingecko.com/coins/images/39453/standard/fwog.png?1722318442",
            }}
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
      messages={data}
      itemContent={renderMessage}
    />
  )
}

export default ChatMessages
