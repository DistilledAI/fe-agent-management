import { useAppSelector } from "@hooks/useAppRedux"
import ChatBotMessages from "pages/Chatbot/components/ChatBotMessages"
import { ChatItem, ChatRoles } from "pages/Chatbot/hooks/useChatMsg"
import { Fragment, useEffect, useRef } from "react"
import UserMessages from "./components/UserMessages"

const Conversation = () => {
  const isChatBox = useAppSelector((state) => state.chatBox.isChatBox)
  const chatMsg = useAppSelector((state) => state.chatMsg)
  const { chat_history } = chatMsg
  const bottomRef = useRef<HTMLDivElement>(null)
  const isChatting = useAppSelector((state) => state.chatBox.isChatting)

  useEffect(() => {
    const bottomElement = bottomRef.current
    bottomElement?.scrollIntoView({ behavior: "smooth" })
  },[isChatting])

  return (
    <div
      className="h-full overflow-y-auto s p-3 dark:bg-[#232521]"
      id="conversation-wrapper"
      style={{
        display: isChatBox ? "block" : "none",
      }}
    >
      <div className="mb-2 w-fit">
        <ChatBotMessages
          chatItem={{
            role: ChatRoles.ASSISTANT,
            content: "Hello, I'm your Oraichain Chatbot. How can I help?",
            id: "1",
          }}
          textCenter
        />
      </div>
      {chat_history.length > 0 && (
        <div className="flex flex-col gap-2">
          {chat_history.map((chatItem: ChatItem, index) => {
            return (
              <Fragment key={index}>
                {chatItem.role === ChatRoles.USER ? (
                  <UserMessages chatItem={chatItem} />
                ) : (
                  <div className="w-fit">
                    <ChatBotMessages chatItem={chatItem} />
                  </div>
                )}
              </Fragment>
            )
          })}
        </div>
      )}
      <div ref={bottomRef}></div>
    </div>
  )
}

export default Conversation
