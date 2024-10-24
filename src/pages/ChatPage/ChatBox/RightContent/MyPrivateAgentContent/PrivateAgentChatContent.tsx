import { brainAIIcon } from "@assets/svg"
import ChatWindow from "@components/ChatWindow"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"
import { useParams } from "react-router-dom"
import ChatInput from "../../ChatInput"
import { IMessageBox, RoleChat } from "../../ChatMessages/helpers"
import useFetchMessages from "../../ChatMessages/useFetchMessages"

const PrivateAgentChatContent: React.FC = () => {
  const { loading, onLoadPrevMessages, messages, isFetched } =
    useFetchMessages()
  const { privateChatId } = useParams()

  const renderMessage = (_: number, message: IMessageBox) => {
    return (
      <div className="mx-auto w-full max-w-[768px] px-3 pb-4 max-sm:px-4">
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
      </div>
    )
  }

  return (
    <>
      <ChatWindow
        messages={messages}
        itemContent={renderMessage}
        loading={loading}
        onLoadPrevMessages={onLoadPrevMessages}
        chatId={privateChatId}
        isFetched={isFetched}
      />
      <ChatInput
        isDisabledInput={false}
        wrapperClassName="left-1/2 -translate-x-1/2 w-[calc(100%-32px)]"
      />
    </>
  )
}
export default PrivateAgentChatContent
