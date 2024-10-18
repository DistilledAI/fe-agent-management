// import AvatarCustom from "@components/AvatarCustom"
// import AvatarGroup from "@components/AvatarGroup"
import MoreAction from "@components/ChatWindow/MoreAction"
import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { Button } from "@nextui-org/react"
// import { TypeGroup } from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
// import { useChatMessage } from "providers/MessageProvider"
import { useNavigate } from "react-router-dom"

const ChatDetailHeader = () => {
  const navigate = useNavigate()
  // const { dataFetch } = useChatMessage()
  // const firstMessage = dataFetch[0]
  // const isGroup = firstMessage?.group?.typeGroup === TypeGroup.PRIVATE_GROUP

  return (
    <div className="fixed left-0 top-0 z-[1] flex h-[55px] w-full items-center justify-between bg-white px-4">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => navigate("/")}
          className="h-9 w-9 min-w-0 rounded-full bg-mercury-70 p-0"
        >
          <ArrowLeftFilledIcon />
        </Button>
        {/* <div>
          {isGroup ? (
            <AvatarGroup groupName={firstMessage?.group?.name} />
          ) : (
            <div className="flex items-center gap-2">
              <AvatarCustom />
              <span className="font-semibold">Distill AI</span>
            </div>
          )}
        </div> */}
      </div>
      <div>
        <MoreAction />
      </div>
    </div>
  )
}

export default ChatDetailHeader
