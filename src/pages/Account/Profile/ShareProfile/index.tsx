import { ShareWithQrIcon } from "@components/Icons/Share"
import { Button, useDisclosure } from "@nextui-org/react"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import ShareQRModal from "@components/ShareQRModal"

const appUrl = window.location.origin

const ShareProfile = () => {
  const { user } = useAuthState()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        className="flex w-full rounded-full bg-mercury-100 max-md:min-h-12"
        onClick={onOpen}
      >
        <ShareWithQrIcon />
        <span className="font-medium text-mercury-950">Share your profile</span>
      </Button>
      {isOpen && (
        <ShareQRModal
          shareUrl={`${appUrl}${PATH_NAMES.AUTHOR_PROFILE}/${user?.id}`}
          isOpen={isOpen}
          onClose={onClose}
          title="My Profile QR"
        />
      )}
    </>
  )
}

export default ShareProfile
