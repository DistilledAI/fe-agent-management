import Avatar from "@components/Avatar"
import ChatBubbles from "pages/Chatbot/components/ChatBubbles"
import { ChatItem } from "pages/Chatbot/hooks/useChatMsg"

const UserMessages = ({ chatItem }: { chatItem: ChatItem }) => {
  return (
    <ChatBubbles chatBubblesClassName="bg-transparent">
      <Avatar avatarInnerClassName="w-[14px] h-[14px]"/>
      <div className="mt-0.5 flex-1 max-w-[318px]">
        <p className="text-14 dark:text-neutral-suface break-words">
          {chatItem.content}
        </p>
      </div>
    </ChatBubbles>
  )
}

export default UserMessages
