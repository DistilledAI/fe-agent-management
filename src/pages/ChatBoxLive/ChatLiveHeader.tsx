import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import TradeTokenButton from "./TradeTokenButton"
import AgentLiveInfo from "./AgentLiveInfo"

const ChatLiveHeader = () => {
  const navigate = useNavigate()
  // const { state } = useLocation()
  // const groupItem = state?.groupItem || {}
  // const isLive = groupItem.group.live === 1

  return (
    <div className="fixed left-0 top-0 z-[1] mt-3 flex h-11 w-full items-center gap-3 bg-mercury-30 px-3 md:hidden">
      <div className="flex flex-1 items-center gap-3">
        <Button
          onClick={() => navigate(-1)}
          className="h-[38px] w-[38px] min-w-[38px] rotate-90 rounded-full bg-mercury-70 p-0"
        >
          <ChevronDownIcon />
        </Button>

        {/* <AvatarContainer
          badgeIcon={<LiveIcon />}
          avatarUrl={groupItem.group.image}
          publicAddress={groupItem.group.name}
          userName={groupItem.group.name}
          badgeClassName={isLive ? "bg-lgd-code-hot-ramp" : ""}
          isLive={isLive}
          usernameClassName={twMerge(
            isLive &&
              "bg-lgd-code-hot-ramp bg-clip-text text-transparent font-bold text-[16px]",
          )}
        /> */}
      </div>

      <div className="flex items-center gap-3">
        <AgentLiveInfo />
        <TradeTokenButton />
      </div>
    </div>
  )
}

export default ChatLiveHeader
