import AvatarCustom from "@components/AvatarCustom"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"

interface MessageLiveProps {
  message: IMessageBox
}
const MessageLive: React.FC<MessageLiveProps> = ({ message }) => {
  return (
    <div className="flex gap-4">
      <div>
        <AvatarCustom
          src={message?.avatar}
          publicAddress={message?.publicAddress}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-base-b">{message?.username}</span>
        <span className="text-base text-mercury-900">{message?.content}</span>
      </div>
    </div>
  )
}

export default MessageLive
