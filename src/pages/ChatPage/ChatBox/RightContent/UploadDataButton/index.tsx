import { TablerPlusIcon } from "@components/Icons/TablerPlusIcon"
import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface UploadDataButtonProps {
  icon: ReactNode
  label: string
  isDisable?: boolean
  radiusFull?: boolean
  onClick?: any
  customClassName?: string
  textClassName?: string
}

const UploadDataButton: React.FC<UploadDataButtonProps> = ({
  icon,
  label,
  isDisable,
  radiusFull,
  onClick,
  customClassName,
  textClassName,
}) => {
  if (!radiusFull) {
    return (
      <div
        className={twMerge(
          "flex h-[60px] min-w-[130px] cursor-pointer items-center justify-center gap-2 rounded-full border border-mercury-70 bg-mercury-30 p-4 shadow-6 aria-selected:opacity-40",
          customClassName,
        )}
        aria-selected={isDisable}
        onClick={onClick}
      >
        {icon}
        <div className={twMerge("text-base-b mr-2 text-center", textClassName)}>
          {label}
        </div>
        <TablerPlusIcon />
      </div>
    )
  }

  return (
    <div
      className={twMerge(
        "flex h-[145px] w-[145px] cursor-pointer flex-col items-center justify-center gap-2 rounded-full border border-mercury-70 bg-mercury-30 p-4 shadow-6 aria-selected:opacity-40",
        customClassName,
      )}
      aria-selected={isDisable}
      onClick={onClick}
    >
      {icon}
      <div className={twMerge("text-base-b text-center", textClassName)}>
        {label}
      </div>
    </div>
  )
}
export default UploadDataButton
