import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

const ChatLiveHeader = () => {
  const navigate = useNavigate()

  return (
    <div className="fixed left-0 top-0 z-[1] flex h-[55px] w-full items-center justify-between bg-white px-3">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => navigate(-1)}
          className="h-9 w-9 min-w-0 rounded-full bg-mercury-70 p-0"
        >
          <ArrowLeftFilledIcon />
        </Button>
      </div>
    </div>
  )
}

export default ChatLiveHeader
