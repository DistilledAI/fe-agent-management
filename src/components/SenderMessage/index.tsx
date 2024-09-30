import { twMerge } from "tailwind-merge"

interface SenderMsgProps {
  content: string
  baseClassName?: string
  contentClassName?: string
}

const SenderMessage = ({
  content,
  baseClassName,
  contentClassName,
}: SenderMsgProps) => {
  return (
    <div
      className={twMerge(
        "mb-4 ml-auto flex w-fit min-w-14 max-w-[90%] items-center justify-center rounded-[22px] bg-mercury-950 px-4 py-3",
        baseClassName,
      )}
    >
      <p className={twMerge("text-base-md text-mercury-30", contentClassName)}>
        {content}
      </p>
    </div>
  )
}

export default SenderMessage
