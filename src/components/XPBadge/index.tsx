import { xpIcon } from "@assets/images"
import { useMemo } from "react"
import { twMerge } from "tailwind-merge"

interface XPBadgeProps {
  xpValue: number | string
  operation?: "plus" | "minus"
  classNames?: {
    wrapper?: string
    value?: string
    icon?: string
  }
}

const XPBadge = ({ xpValue = "-", operation, classNames }: XPBadgeProps) => {
  const displayValue = useMemo(() => {
    switch (operation) {
      case "minus":
        return `-${xpValue}`
      case "plus":
        return `+${xpValue}`
      default:
        return `${xpValue}`
    }
  }, [xpValue, operation])

  return (
    <div className={twMerge("flex items-center gap-1", classNames?.wrapper)}>
      <span
        className={twMerge(
          "text-[14px] font-bold text-mercury-950",
          classNames?.value,
        )}
      >
        {displayValue}
      </span>
      <img
        src={xpIcon}
        alt="xp icon"
        className={twMerge("h-6 w-6", classNames?.icon)}
      />
    </div>
  )
}

export default XPBadge
