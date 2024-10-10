import { ShareWithQrIcon } from "@components/Icons/Share"
import { Button, useDisclosure } from "@nextui-org/react"
import ShareModal from "./ShareModal"
import { IUser } from "@reducers/user/UserSlice"

interface ShareAgentProps {
  isDisabled?: boolean
  agentData: IUser
}

const ShareAgent = ({ isDisabled, agentData }: ShareAgentProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        className="flex rounded-full bg-mercury-100"
        onClick={onOpen}
        isDisabled={isDisabled}
      >
        <ShareWithQrIcon />
        <span className="font-medium text-mercury-950">Share as QR</span>
      </Button>
      {isOpen && (
        <ShareModal isOpen={isOpen} onClose={onClose} agentData={agentData} />
      )}
    </>
  )
}

export default ShareAgent
