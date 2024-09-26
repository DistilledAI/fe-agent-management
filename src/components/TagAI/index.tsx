import { twMerge } from "tailwind-merge"

interface Props {
  tagAIWrapClassName?: string
  textAI?: string
  subTextAI?: string
  textAIClassName?: string
  textSubAIClassName?: string
}

const TagAI: React.FC<Props> = ({
  tagAIWrapClassName,
  textAIClassName,
  textSubAIClassName,
  textAI = "AI",
  subTextAI = "",
}) => {
  return (
    <div
      className={twMerge(
        "flex h-[18px] w-[18px] items-center justify-center rounded bg-black",
        tagAIWrapClassName,
      )}
    >
      <span
        className={twMerge(
          "text-[8px] font-semibold text-white xl:text-[10px]",
          textAIClassName,
        )}
      >
        {textAI}
      </span>
      {subTextAI && (
        <span
          className={twMerge(
            "text-[8px] font-semibold text-white xl:text-[10px]",
            textSubAIClassName,
          )}
        >
          {subTextAI}
        </span>
      )}
    </div>
  )
}

export default TagAI
