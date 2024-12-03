import AvatarCustom from "@components/AvatarCustom"
import { ImageIcon } from "@components/Icons"
import { ArrowsRelyIcon } from "@components/Icons/Arrow"
import MarkdownMessage from "@components/Markdown"
import { RoleUser } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { Button } from "@nextui-org/react"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import { isMarkdownImage } from "@utils/index"
import { twMerge } from "tailwind-merge"

interface MessageLiveProps {
  message: IMessageBox
  onReply: () => void
}
const MessageLive: React.FC<MessageLiveProps> = ({ message, onReply }) => {
  const isBot = message?.roleOwner === RoleUser.BOT
  const { user } = useAuthState()
  const isOwner = user.id === message?.userId

  return (
    <div className="group relative flex gap-3 md:gap-4">
      <div className="absolute -bottom-2 -left-4 -top-2 right-0 rounded-[8px] bg-mercury-70 opacity-0 duration-300 group-hover:opacity-100">
        {!isOwner && (
          <Button
            onClick={onReply}
            className="absolute -top-4 right-10 flex h-8 gap-1 rounded-full border-1 border-mercury-200 bg-white !opacity-100"
          >
            <ArrowsRelyIcon />
            <span>Reply</span>
          </Button>
        )}
      </div>
      <div className="relative">
        <AvatarCustom
          src={message?.avatar}
          publicAddress={message?.publicAddress}
        />
      </div>
      <div className="relative flex flex-col">
        <div className="flex items-center gap-2">
          <p
            className={twMerge(
              "line-clamp-1 max-w-[220px]",
              isBot
                ? "bg-lgd-code-hot-ramp bg-clip-text text-base font-bold text-transparent"
                : "text-base-b",
            )}
          >
            {message?.username}
          </p>
          {message.reply && (
            <div className="flex items-center gap-2">
              <p className="line-clamp-1 max-w-[120px] text-15 font-semibold text-brown-500">
                {message.reply.username}
              </p>
              <p className="line-clamp-1 max-w-[200px] text-15 text-mercury-400">
                {isMarkdownImage(message.reply.message) ? (
                  <ImageIcon color="#ADADAD" />
                ) : (
                  message.reply.message
                )}
              </p>
            </div>
          )}
        </div>
        <div
          className="text-base text-mercury-900 aria-selected:italic"
          aria-selected={isBot}
        >
          <MarkdownMessage msg={message?.content} />
        </div>
      </div>
    </div>
  )
}

export default MessageLive
