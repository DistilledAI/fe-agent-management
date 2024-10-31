import AvatarCustom from "@components/AvatarCustom"
import AvatarGroup from "@components/AvatarGroup"
import useAuthState from "@hooks/useAuthState"
import {
  getAvatarGroupChat,
  getNameGroup,
  getPublicAddressGroupChat,
} from "@pages/ChatPage/ChatBox/LeftBar/helpers"
import {
  TypeGroup,
  UserGroup,
} from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import React from "react"
import { twMerge } from "tailwind-merge"

const ChatInfoCurrent: React.FC<{
  groupDetail: UserGroup | null
  textColor?: string
}> = ({ groupDetail, textColor = "text-mercury-900" }) => {
  const { user } = useAuthState()
  const isGroup = groupDetail?.group?.typeGroup === TypeGroup.PRIVATE_GROUP

  if (!groupDetail) return null

  return (
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
            publicAddress={getPublicAddressGroupChat(
              groupDetail.userId,
              groupDetail.group.userA,
              groupDetail.group.userB,
            )}
            className="h-9 w-9 md:h-10 md:w-10"
          />
          <span
            className={twMerge(
              "line-clamp-1 max-w-[150px] text-[14px] font-semibold md:max-w-[250px] md:text-[16px]",
              textColor,
            )}
          >
            {getNameGroup(
              user,
              groupDetail.group.userA,
              groupDetail.group.userB,
            )}
          </span>
        </div>
      )}
    </div>
  )
}

export default ChatInfoCurrent
