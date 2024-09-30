import ChatWindow from "@components/ChatWindow"
import ReceiverMessage from "@components/ReceiverMessage"
import SenderMessage from "@components/SenderMessage"

const ChatMessages = () => {
  const messages = [
    {
      role: "user",
      content: "Hi, I’m Huynh from Oraichain",
    },
    {
      role: "assistant",
      content:
        "\nHello! It's great to connect with you. I'm excited to share with you the innovative products we're developing, such as Distilled AI, Modestus AI, Cupiee, and KawaiiQ. We're currently seeking offers from VCs or the community to help us take our products to the next level. I'm happy to answer any questions you may have about our products or our company.\n\n",
    },
  ]

  const renderMessage = (
    _: number,
    message: { role: string; content: string },
  ) => {
    return (
      <>
        {message.role === "assistant" ? (
          <ReceiverMessage
            avatar={{
              src: "https://assets.coingecko.com/coins/images/39453/standard/fwog.png?1722318442",
            }}
            content={message.content}
          />
        ) : null}
        {message.role === "user" ? (
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
    />
  )
}

export default ChatMessages
