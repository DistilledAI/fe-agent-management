import AvatarCustom, { AvatarCustomProps } from "@components/AvatarCustom"
import MarkdownMessage from "@components/Markdown"
import { twMerge } from "tailwind-merge"

interface ReceiverMsgProps {
  content: string
  avatar: AvatarCustomProps
  contentClassName?: string
  isTyping?: boolean
}

const ReceiverMessage = ({
  content,
  avatar,
  contentClassName,
  isTyping,
}: ReceiverMsgProps) => {
  return (
    <div className="flex gap-4">
      <AvatarCustom {...avatar} />
      <p className={twMerge("text-base-md flex-1", contentClassName)}>
        {isTyping ? "..." : <MarkdownMessage msg={content} />}
      </p>
    </div>
  )
}

export default ReceiverMessage
