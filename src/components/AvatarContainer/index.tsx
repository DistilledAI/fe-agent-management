import AvatarCustom from "@components/AvatarCustom"
import { ReactNode } from "react"

interface AvatarContainerProps {
  badgeIcon: ReactNode
  avatarUrl?: string
  userName: string
  badgeClassName: string
  publicAddress?: string
  avatarClassName?: string
}
const AvatarContainer: React.FC<AvatarContainerProps> = ({
  badgeIcon,
  avatarUrl,
  userName,
  badgeClassName,
  publicAddress,
  avatarClassName,
}) => {
  return (
    <div className="flex items-center gap-x-3">
      <AvatarCustom
        badgeIcon={badgeIcon}
        src={avatarUrl}
        publicAddress={publicAddress}
        badgeClassName={badgeClassName}
        className={avatarClassName}
      />
      {userName && (
        <span className="text-base-md line-clamp-1 text-ellipsis text-mercury-950">
          {userName}
        </span>
      )}
    </div>
  )
}
export default AvatarContainer
