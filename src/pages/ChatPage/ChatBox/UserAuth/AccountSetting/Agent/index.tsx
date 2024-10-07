import AvatarCustom from "@components/AvatarCustom"
import { CopyIcon } from "@components/Icons/Copy"
import { EditPenOutlineIcon } from "@components/Icons/Edit"
import { MetamaskIconSmall } from "@components/Icons/MetamaskIcon"
import { ShareWithCloudIcon } from "@components/Icons/Share"
import useAuthState from "@hooks/useAuthState"
import { Button } from "@nextui-org/react"
import { centerTextEllipsis, copyClipboard } from "@utils/index"
import AgentUsername from "./Username"
import AgentDescription from "./Description"
import ShareAgent from "./ShareAgent"

const PrivateAgent = () => {
  const { user } = useAuthState()

  return (
    <div className="flex flex-col gap-4 rounded-[22px] border-1 border-white bg-mercury-30 p-4">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-mercury-950">
          My Private Agent:
        </span>
        <div className="relative">
          <AvatarCustom src={user?.avatar} />
          <Button className="absolute -bottom-2 -right-1 flex h-6 w-6 min-w-0 items-center justify-center rounded-full bg-white p-0">
            <EditPenOutlineIcon />
          </Button>
        </div>
      </div>
      <AgentUsername />
      <AgentDescription />
      <div className="flex items-center justify-between">
        <span className="text-mercury-600">Address:</span>
        <div className="flex items-center gap-2">
          <span className="line-clamp-1 whitespace-nowrap text-mercury-900">
            {centerTextEllipsis(user?.publicAddress ?? "", 6)}
          </span>
          <Button
            onClick={(e) => copyClipboard(e, user?.publicAddress ?? "")}
            className="h-auto w-auto min-w-0 bg-transparent p-0"
          >
            <CopyIcon />
          </Button>
          <MetamaskIconSmall />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <ShareAgent />
        <Button className="flex rounded-full bg-mercury-100">
          <ShareWithCloudIcon />
          <span className="font-medium text-mercury-950">
            Publish on Marketplace
          </span>
        </Button>
      </div>
    </div>
  )
}

export default PrivateAgent
