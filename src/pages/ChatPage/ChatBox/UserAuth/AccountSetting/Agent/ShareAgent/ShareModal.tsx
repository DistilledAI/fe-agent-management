import { distilledAIIcon } from "@assets/svg"
import CloseButton from "@components/CloseButton"
import { CopyIcon } from "@components/Icons/Copy"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react"
import { copyClipboard } from "@utils/index"
import { QRCodeSVG } from "qrcode.react"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
}

const appUrl = window.location.hostname

const ShareModal = ({ isOpen, onClose }: ShareModalProps) => {
  const { user } = useAuthState()

  const inviteUrl = `${appUrl}${PATH_NAMES.INVITE}/${user?.id}`
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      classNames={{
        base: "bg-white w-fit",
        wrapper: "z-[99]",
        backdrop: "z-[99]",
      }}
      size="sm"
    >
      <ModalContent>
        <ModalHeader className="relative">
          <h3 className="flex-1 text-center text-24 font-semibold text-mercury-950">
            My Agent QR
          </h3>
          <CloseButton
            onClose={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          />
        </ModalHeader>
        <ModalBody className="flex items-center justify-center pb-4">
          <QRCodeSVG
            value={`${appUrl}/${PATH_NAMES.INVITE}/123`}
            size={256}
            title="My Agent QR"
            imageSettings={{
              src: distilledAIIcon,
              width: 38,
              height: 20,
              excavate: true,
            }}
            level="H"
          />

          <div className="flex items-center gap-1">
            <span className="line-clamp-1 whitespace-nowrap text-base text-mercury-950">
              {inviteUrl}
            </span>
            <Button
              onClick={(e) => copyClipboard(e, inviteUrl)}
              className="h-auto w-auto min-w-0 bg-transparent p-0"
            >
              <CopyIcon />
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ShareModal
