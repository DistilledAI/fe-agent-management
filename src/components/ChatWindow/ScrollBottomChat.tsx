import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import { Button } from "@nextui-org/react"
import { RefObject } from "react"
import { VirtuosoHandle } from "react-virtuoso"

interface Props {
  isScrollBottom: boolean
  virtuosoRef: RefObject<VirtuosoHandle>
}

const ScrollBottomChat = ({ isScrollBottom, virtuosoRef }: Props) => {
  const onScrollToBottom = () => {
    virtuosoRef.current?.scrollToIndex({
      index: "LAST",
      behavior: "smooth",
      align: "end",
    })
  }

  if (!isScrollBottom) {
    return <></>
  }

  return (
    <div className="absolute inset-x-0 bottom-0 z-10 flex h-20 w-full items-center justify-center bg-fading-white bg-cover bg-no-repeat">
      <Button
        onClick={onScrollToBottom}
        className="w-10 min-w-10 rounded-full border border-mercury-900 bg-mercury-950 px-4 py-2"
      >
        <div className="rotate-180">
          <ArrowUpFilledIcon />
        </div>
      </Button>
    </div>
  )
}

export default ScrollBottomChat
