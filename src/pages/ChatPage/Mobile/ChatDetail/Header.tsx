import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

const ChatDetailHeader = () => {
  const navigate = useNavigate()

  return (
    <div className="fixed left-0 top-0 flex h-[50px] w-full items-center justify-between bg-white px-4">
      <Button
        onClick={() => navigate("/")}
        className="h-9 w-9 min-w-0 rounded-full bg-mercury-70 p-0"
      >
        <ArrowLeftFilledIcon />
      </Button>
    </div>
  )
}

export default ChatDetailHeader
