import { Button } from "@nextui-org/react"
import { twMerge } from "tailwind-merge"

interface Props {
  iconBtnWrapClassName?: string
  iconClassName?: string
  iconUrl?: string
  onClick?: () => void
  children?: React.ReactNode
  [key: string]: any
}

const ButtonIcon: React.FC<Props> = ({
  onClick,
  iconBtnWrapClassName,
  iconClassName,
  iconUrl,
  children,
  ...props
}) => {
  return (
    <Button
      isIconOnly
      size="sm"
      radius="sm"
      type="button"
      aria-label="Close"
      className={twMerge(
        "bg-transparent hover:bg-gray-20 max-lg:h-unit-6 max-lg:w-unit-6 max-lg:min-w-unit-6 dark:hover:bg-neutral-title",
        iconBtnWrapClassName,
      )}
      onClick={onClick}
      {...props}
    >
      {typeof iconUrl === "string" ? (
        <img
          src={iconUrl}
          className={twMerge("h-4 w-4 lg:h-5 lg:w-5 ", iconClassName)}
        />
      ) : (
        children
      )}
    </Button>
  )
}

export default ButtonIcon
