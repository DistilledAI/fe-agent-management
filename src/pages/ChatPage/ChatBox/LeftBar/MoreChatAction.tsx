import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { DotFilledIcon } from "@components/Icons/DotIcon"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { leaveGroup } from "services/chat"

const MoreChatAction: React.FC<{ groupId: number }> = ({ groupId }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { isOpen: openPopup, onOpen, onOpenChange, onClose } = useDisclosure()
  const navigate = useNavigate()

  const handleLeaveGroup = async () => {
    try {
      const response = await leaveGroup(groupId)
      if (response?.data?.message) {
        onOpenChange()
        navigate("/")
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        placement="bottom-start"
      >
        <PopoverTrigger>
          <div className="flex-items-center absolute right-4 top-3 hidden h-8 w-8 cursor-pointer justify-center rounded-full bg-mercury-300 shadow-1 group-hover:flex">
            <DotFilledIcon size={16} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="bg-mercury-950">
          <div className="px-1 py-2">
            <span
              className="text-base-sb cursor-pointer text-white"
              onClick={() => {
                setIsOpen(false)
                onOpen()
              }}
            >
              Leave group
            </span>
          </div>
        </PopoverContent>
      </Popover>

      <Modal
        isOpen={openPopup}
        onOpenChange={onOpenChange}
        hideCloseButton
        classNames={{
          base: "bg-white",
        }}
        size="lg"
      >
        <ModalContent>
          <ModalBody>
            <div className="relative mt-4 w-auto pb-2">
              <div className="flex-items-center justify-between">
                <span className="text-22 font-semibold text-mercury-950">
                  Leave group chat?
                </span>
                <div className="cursor-pointer" onClick={onOpenChange}>
                  <CloseFilledIcon />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  className="mt-4 min-w-32 rounded-full bg-mercury-200 text-[15px] font-medium text-primary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  className="mt-4 min-w-32 rounded-full bg-mercury-950 text-[15px] font-medium text-white"
                  onClick={() => handleLeaveGroup()}
                >
                  Leave group
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
export default MoreChatAction
