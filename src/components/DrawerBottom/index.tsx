import CloseButton from "@components/CloseButton"
import useOutsideClick from "@hooks/useOutSideClick"
import { useRef } from "react"
import { twMerge } from "tailwind-merge"

interface DrawerBottomProps {
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
  isOutsideClose = false,
  className,
  classNames,
}: DrawerBottomProps) => {
  const outsideRef = useRef<any>()
  useOutsideClick(outsideRef, onClose)

  return (
    <div
      ref={isOutsideClose ? outsideRef : null}
      className={twMerge(
        "fixed bottom-0 left-1/2 z-[40] mx-auto h-[calc(100dvh-200px)] w-[1100px] max-w-full -translate-x-1/2 translate-y-[100%] rounded-b-[32px] rounded-t-[40px] bg-[rgba(211,211,211,0.70)] shadow-4 backdrop-blur-[15px] duration-400 ease-in-out",
        isOpen && "translate-y-0",
        className,
        classNames?.base,
      )}
    >
      {isOpen ? (
        <>
          <CloseButton
            onClose={onClose}
            className={twMerge(
              "absolute right-5 top-10 z-[1]",
              classNames?.closeButton,
            )}
          />
          <div
            className={twMerge(
              "h-full w-full translate-y-[100px] px-[100px] py-10 delay-100 duration-500",
              isOpen && "translate-y-0",
              classNames?.body,
            )}
          >
            {children}
          </div>
        </>
      ) : null}
    </div>
  )
}

export default DrawerBottom
