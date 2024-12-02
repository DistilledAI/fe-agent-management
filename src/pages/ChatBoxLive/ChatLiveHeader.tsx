import AvatarContainer from "@components/AvatarContainer"
import { LiveIcon } from "@components/Icons"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import TotalMemberBadge from "@components/TotalMemberBadge"
import { PATH_NAMES } from "@constants/index"
import { Button } from "@nextui-org/react"
import { UserGroup } from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import React from "react"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import AgentLiveInfo from "./AgentLiveInfo"
import TradeTokenButton from "./TradeTokenButton"

const ChatLiveHeader: React.FC<{
  groupDetail: UserGroup | null
}> = ({ groupDetail }) => {
  const navigate = useNavigate()
  const isLive = groupDetail ? groupDetail.group.live === 1 : false
  const groupId = groupDetail?.groupId as any
  const isMaxi =
    groupDetail?.group.label === "@maxisbuyin" ||
    groupDetail?.group.label === "@maxisbuyin_"

  return (
    <div className="fixed left-0 top-0 z-20 flex h-14 w-full items-center gap-3 bg-mercury-30 px-3 md:hidden">
      <div className="flex flex-1 items-center gap-3">
        <Button
          onClick={() => navigate(PATH_NAMES.HOME)}
          className="h-[38px] w-[38px] min-w-[38px] rotate-90 rounded-full bg-mercury-70 p-0"
        >
          <ChevronDownIcon />
        </Button>
        {groupDetail ? (
          <AvatarContainer
            badgeIcon={<LiveIcon />}
            avatarUrl={groupDetail.group.image}
            publicAddress={groupDetail.group.name}
            userName={groupDetail.group.name}
            badgeClassName={isLive ? "bg-lgd-code-hot-ramp" : ""}
            isLive={isLive}
            usernameClassName={twMerge(
              isLive &&
                "bg-lgd-code-hot-ramp bg-clip-text text-transparent font-bold text-[16px]",
            )}
          />
        ) : (
          <></>
        )}
        {isLive && <TotalMemberBadge groupId={groupId} />}
      </div>

      <div className="flex items-center gap-3">
        <AgentLiveInfo groupDetail={groupDetail} />
        <TradeTokenButton isMaxi={isMaxi} />
      </div>
    </div>
  )
}

export default ChatLiveHeader
