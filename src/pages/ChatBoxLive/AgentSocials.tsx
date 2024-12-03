import SocialButton from "./SocialButton"
import { TwitterIcon } from "@components/Icons/Twitter"
import { TelegramOutlineIcon } from "@components/Icons/SocialLinkIcon"
import AgentShareButton from "./AgentShareButton"
import { twMerge } from "tailwind-merge"

export interface AgentSocialsProps {
  agentInfo:
    | {
        username: string
        xLink: string
        teleLink: string
        shareLink: string
        contract: string
      }
    | undefined
  classNames?: {
    wrapper?: string
  }
}

const AgentSocials = ({ agentInfo, classNames }: AgentSocialsProps) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-between gap-3",
        classNames?.wrapper,
      )}
    >
      <SocialButton
        icon={<TwitterIcon size={20} />}
        link={agentInfo?.xLink}
        isDisabled={!agentInfo?.xLink}
      />
      <SocialButton
        icon={<TelegramOutlineIcon size={20} />}
        link={agentInfo?.teleLink}
        isDisabled={!agentInfo?.teleLink}
      />
      <AgentShareButton agentInfo={agentInfo} />
    </div>
  )
}

export default AgentSocials
