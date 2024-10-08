import { ShareWithQrIcon } from "@components/Icons/Share"
import { Button, useDisclosure } from "@nextui-org/react"
import ShareModal from "./ShareModal"

const ShareAgent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button className="flex rounded-full bg-mercury-100" onClick={onOpen}>
        <ShareWithQrIcon />
        <span className="font-medium text-mercury-950">Share as QR</span>
      </Button>
      {isOpen && <ShareModal isOpen={isOpen} onClose={onClose} />}
    </>
  )
}

export default ShareAgent
