import AvatarCustom from "@components/AvatarCustom"
import { ReactNode } from "react"

interface AvatarContainerProps {
  badgeIcon: ReactNode
  avatarUrl: string
  userName: string
  badgeColor: string
}
const AvatarContainer: React.FC<AvatarContainerProps> = ({
  badgeIcon,
  avatarUrl,
  userName,
  badgeColor,
}) => {
  return (
    <div className="flex-items-center gap-3">
      <AvatarCustom
        badgeIcon={badgeIcon}
        src={avatarUrl}
        badgeColor={badgeColor}
      />
      <span className="text-base-m text-mercury-950">{userName}</span>
    </div>
  )
}
export default AvatarContainer
