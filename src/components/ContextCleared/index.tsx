import { twMerge } from "tailwind-merge"

interface ContextClearedProps {
  wrapperClassName?: string
  textClassName?: string
  content?: string
}

const ContextCleared = ({
  textClassName,
  wrapperClassName,
  content = "Context cleared",
}: ContextClearedProps) => {
  return (
    <div
      className={twMerge(
        "flex h-fit w-full items-center justify-center gap-x-3",
        wrapperClassName,
      )}
    >
      <div className="h-[1px] flex-1 bg-mercury-100" />
      <span
        className={twMerge("text-14 font-bold text-mercury-950", textClassName)}
      >
        {content}
      </span>
      <div className="h-[1px] flex-1 bg-mercury-100" />
    </div>
  )
}

export default ContextCleared
