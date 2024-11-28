import AvatarCustom from "@components/AvatarCustom"
import { LiveIcon } from "@components/Icons"
import { centerTextEllipsis } from "@utils/index"
import React, { ReactNode } from "react"
import { twMerge } from "tailwind-merge"
import { match } from "ts-pattern"

interface AvatarContainerProps {
  badgeIcon?: ReactNode
  avatarUrl?: string
  userName: string
  badgeClassName?: string
  publicAddress?: string
  avatarClassName?: string
  isLive?: boolean
  usernameClassName?: string
  wrapperClassName?: string
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
  wrapperClassName,
}) => {
  return (
    <div className={twMerge("flex items-center gap-x-3", wrapperClassName)}>
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

export const AvatarClan: React.FC<{
  avatarUrl?: string
  name: string
  publicAddress?: string
  category?: "first" | "second"
  owner?: {
    avatar?: string
    username: string
    publicAddress: string
  }
}> = ({ avatarUrl, publicAddress, name, category = "first", owner }) => {
  const renderInfoByCategory = () => {
    return match(category)
      .with("first", () => (
        <div>
          <span className="text-13 font-medium text-mercury-700">Clan</span>
          <p className="line-clamp-1 text-16 font-bold text-mercury-950">
            {name}
          </p>
        </div>
      ))
      .with("second", () => (
        <div>
          <p className="line-clamp-1 text-16 font-bold text-mercury-950">
            {name}
          </p>
          <div className="flex items-center gap-1">
            <span className="text-14 font-medium text-mercury-600">
              Owned by
            </span>
            {owner && (
              <AvatarContainer
                avatarUrl={owner.avatar}
                publicAddress={owner.publicAddress}
                userName={owner.username || "Unnamed"}
                avatarClassName="w-5 h-5"
                usernameClassName="text-14 text-[#A2845E] font-bold"
              />
            )}
          </div>
        </div>
      ))
      .run()
  }

  return (
    <div className="flex items-center gap-x-3">
      <AvatarCustom
        badgeIcon={<LiveIcon />}
        src={avatarUrl}
        publicAddress={publicAddress}
        badgeClassName="bg-lgd-code-hot-ramp"
        isLive={true}
      />
      {renderInfoByCategory()}
    </div>
  )
}

export const AvatarMention: React.FC<{
  avatarUrl?: string
  name: string
  publicAddress?: string
}> = ({ avatarUrl, name, publicAddress }) => {
  return (
    <div className="flex items-center gap-x-3">
      <AvatarCustom
        src={avatarUrl}
        publicAddress={publicAddress}
        badgeClassName="bg-lgd-code-hot-ramp"
        className="h-8 w-8"
      />
      <div className="flex items-center gap-2">
        <p className="line-clamp-1 text-14 font-semibold">{name}</p>
        <p className="text-14 text-mercury-600">
          ({centerTextEllipsis(publicAddress ?? "", 4)})
        </p>
      </div>
    </div>
  )
}
