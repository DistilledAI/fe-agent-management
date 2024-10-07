import { CloseFilledIcon } from "@components/Icons/DefiLens"
import useOutsideClick from "@hooks/useOutSideClick"
import { Button } from "@nextui-org/react"
import { useRef } from "react"
import { twMerge } from "tailwind-merge"

interface Props {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  isOutsideClose?: boolean
  className?: string
  classNames?: {
    base?: string
    closeButton?: string
    body?: string
  }
}

const DrawerBottom = ({
  isOpen,
  onClose,
  children,
  isOutsideClose = true,
  className,
  classNames,
}: Props) => {
  const outsideRef = useRef<any>()
  useOutsideClick(outsideRef, onClose)

  return (
    <div
      ref={isOutsideClose ? outsideRef : null}
      className={twMerge(
        "shadow-4 fixed bottom-0 left-1/2 z-[99] mx-auto h-[75%] w-[1100px] max-w-full -translate-x-1/2 translate-y-[100%] rounded-b-[32px] rounded-t-[40px] bg-[rgba(211,211,211,0.70)] backdrop-blur-[15px] duration-500",
        isOpen && "translate-y-0",
        className,
        classNames?.base,
      )}
    >
      <Button
        isIconOnly
        onClick={onClose}
        className={twMerge(
          "absolute right-5 top-10 z-[1] rounded-full bg-transparent hover:bg-mercury-70",
          classNames?.closeButton,
        )}
      >
        <CloseFilledIcon />
      </Button>
      <div
        className={twMerge(
          "h-full w-full translate-y-[100px] px-[100px] py-10 delay-100 duration-500",
          isOpen && "translate-y-0",
          classNames?.body,
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default DrawerBottom
