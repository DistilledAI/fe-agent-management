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
  const breakLine = (msg: string) => msg.replace(/\n/g, "  \n")
  return (
    <div className="flex gap-4">
      <AvatarCustom {...avatar} />
      <p className={twMerge("text-base-md flex-1", contentClassName)}>
        <Markdown>{breakLine(content)}</Markdown>
      </p>
    </div>
  )
}

export default ReceiverMessage
