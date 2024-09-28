import { Avatar, Badge } from "@nextui-org/react"
import { ReactNode } from "react"

interface AvatarCustomProps {
  badgeIcon: ReactNode
  src: string
  badgeColor: string
}

const AvatarCustom: React.FC<AvatarCustomProps> = ({
  badgeIcon,
  src,
  badgeColor,
}) => {
  if (badgeIcon) {
    return (
      <Badge
        content={badgeIcon}
        placement="bottom-right"
        variant="solid"
        isOneChar
        size="lg"
        classNames={{
          badge: badgeColor,
        }}
        showOutline={false}
      >
        <Avatar isBordered src={src} />
      </Badge>
    )
  }

  return <Avatar isBordered src={src} />
}
export default AvatarCustom
