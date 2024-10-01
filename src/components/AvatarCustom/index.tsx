import { Avatar, Badge } from "@nextui-org/react"
import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

export interface AvatarCustomProps {
  badgeIcon?: string | ReactNode
  src?: string
  badgeClassName?: string
  badgeBaseClassName?: string
}

const AvatarCustom: React.FC<AvatarCustomProps> = ({
  badgeIcon,
  src,
  badgeClassName,
  badgeBaseClassName,
}) => {
  if (badgeIcon) {
    return (
      <Badge
        content={badgeIcon}
        placement="bottom-right"
        variant="solid"
        isOneChar
        classNames={{
          base: twMerge("h-fit", badgeBaseClassName),
          badge: twMerge(
            "min-w-[18px] min-h-[18px] w-[18px] h-[18px] right-[15%] bottom-[15%]",
            badgeClassName,
          ),
        }}
        showOutline={false}
      >
        <Avatar src={src} className="border border-mercury-400" />
      </Badge>
    )
  }

  return <Avatar src={src} className="border border-mercury-400" />
}
export default AvatarCustom