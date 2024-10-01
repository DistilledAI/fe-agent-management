import { distilledAIIcon } from "@assets/svg"
import { Image } from "@nextui-org/react"
import { twMerge } from "tailwind-merge"

interface IProps {
  baseClassName?: string
  iconClassName?: string
}

const DistilledAIIcon = ({ baseClassName, iconClassName }: IProps) => {
  return (
    <div
      className={twMerge(
        "flex h-8 w-8 items-center justify-center rounded-full border border-mercury-400",
        baseClassName,
      )}
    >
      <Image
        src={distilledAIIcon}
        alt="distilled AI icon"
        className={iconClassName}
      />
    </div>
  )
}

export default DistilledAIIcon
