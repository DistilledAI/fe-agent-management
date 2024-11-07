import CloseButton from "@components/CloseButton"
import { InfoCircleOutlineIcon } from "@components/Icons/InfoCircleIcon"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import AgentDescription from "./AgentDescription"
import TwitterButton from "./TwitterButton"

const AgentLiveInfo = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <>
      <Button
        className="h-[38px] w-[38px] min-w-[38px] rounded-full bg-mercury-70 p-0"
        onClick={onOpen}
      >
        <InfoCircleOutlineIcon />
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        hideCloseButton
        placement="bottom"
        classNames={{
          base: "bg-mercury-30 m-0 rounded-b-none h-auto max-h-full",
          wrapper: "z-[99]",
          backdrop: "z-[99]",
        }}
      >
        <ModalContent>
          <ModalHeader className="relative px-3">
            <h3 className="flex-1 text-center text-18 font-semibold text-mercury-950">
              Agent info
            </h3>
            <CloseButton
              onClose={onClose}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            />
          </ModalHeader>
          <ModalBody className="gap-4 px-3 py-4">
            <TwitterButton />
            <AgentDescription />
          </ModalBody>
          <ModalFooter className="px-3">
            <Button
              className="h-14 w-full rounded-full bg-mercury-950 text-[16px] text-mercury-30"
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AgentLiveInfo
