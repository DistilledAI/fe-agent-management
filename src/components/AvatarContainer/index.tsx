import AvatarCustom from "@components/AvatarCustom"
import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface AvatarContainerProps {
  badgeIcon: ReactNode
  avatarUrl?: string
  userName: string
  badgeClassName: string
  publicAddress?: string
  avatarClassName?: string
  isLive?: boolean
  usernameClassName?: string
}
const AvatarContainer: React.FC<AvatarContainerProps> = ({
  badgeIcon,
  avatarUrl,
  userName,
  badgeClassName,
  publicAddress,
  avatarClassName,
  isLive = false,
  usernameClassName,
}) => {
  return (
    <div className="flex items-center gap-x-3">
      <AvatarCustom
        badgeIcon={badgeIcon}
        src={avatarUrl}
        publicAddress={publicAddress}
        badgeClassName={badgeClassName}
        className={avatarClassName}
        isLive={isLive}
      />
      {userName && (
        <span
          className={twMerge(
            "line-clamp-1 text-ellipsis text-16 font-medium text-mercury-950",
            usernameClassName,
          )}
        >
          {userName}
        </span>
      )}
    </div>
  )
}
export default AvatarContainer
