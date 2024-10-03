import AvatarCustom, { AvatarCustomProps } from "@components/AvatarCustom"
import Markdown from "react-markdown"
import { twMerge } from "tailwind-merge"

interface ReceiverMsgProps {
  content: string
  avatar: AvatarCustomProps
  contentClassName?: string
}

const ReceiverMessage = ({
  content,
  avatar,
  contentClassName,
}: ReceiverMsgProps) => {
  return (
    <div className="flex gap-4">
      <AvatarCustom {...avatar} />
      <p className={twMerge("text-base-md flex-1", contentClassName)}>
        <Markdown>{content}</Markdown>
      </p>
    </div>
  )
}

export default ReceiverMessage
