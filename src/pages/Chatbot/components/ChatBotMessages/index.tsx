import { chatbotOraiImg } from "@assets/images"
import Avatar from "@components/Avatar"
import ChatBubbles from "pages/Chatbot/components/ChatBubbles"
import { ChatItem } from "pages/Chatbot/hooks/useChatMsg"
import { twMerge } from "tailwind-merge"
import FeedbackAction from "../FeedbackAction"

const ChatBotMessages = ({
  chatItem,
  textCenter,
}: {
  chatItem: ChatItem
  textCenter?: boolean
}) => {
  return (
    <ChatBubbles
      chatBubblesClassName={twMerge(
        " dark:bg-[#31332E]",
        textCenter && "items-center",
      )}
    >
      <Avatar
        avatarUrl={chatbotOraiImg}
        avatarWrapClassName=" !bg-transparent"
        avatarInnerClassName="!h-4.5 w-6"
      />
      <div className="mt-0.5 flex-1 max-w-[318px]">
        <p
          className="whitespace-pre-line break-words text-14 dark:text-neutral-suface"
          id="chatbot-awnser"
        >
          {chatItem.content ? chatItem.content.replace(/^ \n+/, "") : ""}
          {chatItem.id !== "1" && <FeedbackAction chatItem={chatItem} />}
        </p>
      </div>
    </ChatBubbles>
  )
}

export default ChatBotMessages
