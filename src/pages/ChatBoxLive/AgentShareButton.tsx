import { ShareArrowIcon } from "@components/Icons/Share"
import ShareQRModal from "@components/ShareQRModal"
import { Button, useDisclosure } from "@nextui-org/react"
import { AgentSocialsProps } from "./AgentSocials"

export interface AgentShareButtonProps {
  agentInfo: AgentSocialsProps["agentInfo"]
}

const AgentShareButton = ({ agentInfo }: AgentShareButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        className="h-14 w-full rounded-full bg-mercury-70 text-white md:h-10"
        onClick={onOpen}
        isDisabled={!agentInfo?.shareLink}
      >
        <ShareArrowIcon />
      </Button>
      <ShareQRModal
        title={agentInfo?.username}
        isOpen={isOpen}
        shareUrl={agentInfo?.shareLink || ""}
        onClose={onClose}
      />
    </>
  )
}

export default AgentShareButton
