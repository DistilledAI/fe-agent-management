import AvatarCustom from "@components/AvatarCustom"
import { RoleUser } from "@constants/index"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import { twMerge } from "tailwind-merge"

interface MessageLiveProps {
  message: IMessageBox
}
const MessageLive: React.FC<MessageLiveProps> = ({ message }) => {
  console.log("🚀 ~ message:", message)
  const isBot = message?.roleOwner === RoleUser.BOT

  return (
    <div className="flex gap-4">
      <div>
        <AvatarCustom
          src={message?.avatar}
          publicAddress={message?.publicAddress}
        />
      </div>
      <div className="flex flex-col">
        <span
          className={twMerge(
            isBot
              ? "bg-lgd-code-hot-ramp bg-clip-text text-base font-bold text-transparent"
              : "text-base-b",
          )}
        >
          {message?.username}
        </span>
        <span
          className="text-base text-mercury-900 aria-selected:italic"
          aria-selected={isBot}
        >
          {message?.content}
        </span>
      </div>
    </div>
  )
}

export default MessageLive
