import AvatarCustom, { AvatarCustomProps } from "@components/AvatarCustom"
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
    <div className="mb-4 flex gap-4">
      <AvatarCustom {...avatar} />
      <p className={twMerge("text-base-md flex-1", contentClassName)}>
        {content}
      </p>
    </div>
  )
}

export default ReceiverMessage
