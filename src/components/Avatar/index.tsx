import { avatarDefaultIcon } from "@assets/svg"
import React from "react"
import { twMerge } from "tailwind-merge"

interface Props {
  avatarUrl?: string
  avatarWrapClassName?: string
  avatarInnerClassName?: string
}

const Avatar: React.FC<Props> = ({
  avatarUrl,
  avatarWrapClassName,
  avatarInnerClassName,
}) => {
  return (
    <div
      className={twMerge(
        "flex h-6 w-6 items-center justify-center rounded-full bg-gray-light-blue dark:bg-[#2B2D33]",
        avatarWrapClassName,
      )}
    >
      <img
        src={avatarUrl ? avatarUrl : avatarDefaultIcon}
        alt=""
        className={twMerge("", avatarInnerClassName)}
      />
    </div>
  )
}

export default Avatar
