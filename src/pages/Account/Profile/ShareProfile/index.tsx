import { ShareWithQrIcon } from "@components/Icons/Share"
import { Button, useDisclosure } from "@nextui-org/react"
import ShareModal from "./ShareModal"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import ComingSoon from "@components/ComingSoon"

const appUrl = window.location.origin

const ShareProfile = () => {
  const { user } = useAuthState()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <ComingSoon>
        <Button
          className="flex w-full rounded-full bg-mercury-100 max-md:min-h-12"
          onClick={onOpen}
          isDisabled={true}
        >
          <ShareWithQrIcon />
          <span className="font-medium text-mercury-950">
            Share your profile
          </span>
        </Button>
      </ComingSoon>
      {isOpen && (
        <ShareModal
          shareUrl={`${appUrl}${PATH_NAMES.INVITE}/${user?.id}`}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  )
}

export default ShareProfile
