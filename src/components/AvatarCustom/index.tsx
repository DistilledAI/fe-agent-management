import { Avatar, Badge, SlotsToClasses } from "@nextui-org/react"
import React, { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

export interface AvatarCustomProps {
  badgeIcon?: string | ReactNode
  src?: string
  classNames?:
    | SlotsToClasses<"base" | "img" | "name" | "icon" | "fallback">
    | undefined
  badgeClassName?: string
  badgeBaseClassName?: string
  icon?: React.ReactNode
}

const AvatarCustom: React.FC<AvatarCustomProps> = ({
  badgeIcon,
  src,
  classNames,
  badgeClassName,
  badgeBaseClassName,
  icon,
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
            "min-w-[18px] min-h-[18px] w-[18px] h-[18px] right-[15%] bottom-[15%] z-1",
            badgeClassName,
          ),
        }}
        showOutline={false}
      >
        <Avatar
          src={src}
          icon={icon}
          className="border border-mercury-400 bg-mercury-100"
          disableAnimation={true}
        />
      </Badge>
    )
  }

  return (
    <Avatar
      classNames={classNames}
      src={src}
      icon={icon}
      className="border border-mercury-400 bg-mercury-100"
      disableAnimation={true}
    />
  )
}
export default AvatarCustom
