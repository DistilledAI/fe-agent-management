import AvatarCustom from "@components/AvatarCustom"
import AvatarGroup from "@components/AvatarGroup"
import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { Button } from "@nextui-org/react"
import { TypeGroup } from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import { useNavigate } from "react-router-dom"
import useFetchDetail from "./useFetch"
import {
  getAvatarGroupChat,
  getNameGroup,
} from "@pages/ChatPage/ChatBox/LeftBar/helpers"
import useAuthState from "@hooks/useAuthState"
import DelegatePrivateAgent from "@pages/ChatPage/ChatBox/ChatMessages/ChatActions/DelegatePrivateAgent"

const ChatDetailHeader = () => {
  const navigate = useNavigate()
  const { user } = useAuthState()
  const { groupDetail } = useFetchDetail()
  const isGroup = groupDetail?.group?.typeGroup === TypeGroup.PRIVATE_GROUP

  return (
    <div className="fixed left-0 top-0 z-[1] flex h-[55px] w-full items-center justify-between bg-white px-4">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => navigate("/")}
          className="h-9 w-9 min-w-0 rounded-full bg-mercury-70 p-0"
        >
          <ArrowLeftFilledIcon />
        </Button>
        {groupDetail && (
          <div>
            {isGroup ? (
              <AvatarGroup groupName={groupDetail.group.name} />
            ) : (
              <div className="flex items-center gap-2">
                <AvatarCustom
                  src={getAvatarGroupChat(
                    groupDetail.userId,
                    groupDetail.group.userA,
                    groupDetail.group.userB,
                  )}
                  classNames={{ base: "w-[36px] h-[36px]" }}
                />
                <span className="line-clamp-1 max-w-[180px] text-15 font-semibold">
                  {getNameGroup(
                    user,
                    groupDetail.group.userA,
                    groupDetail.group.userB,
                  )}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <DelegatePrivateAgent />
      </div>
    </div>
  )
}

export default ChatDetailHeader
