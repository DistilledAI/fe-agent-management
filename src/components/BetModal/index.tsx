import { Modal, ModalContent } from "@nextui-org/react"
import Betting from "@pages/BetingPage"
import React from "react"

const BetModal: React.FC<{
  isOpen: boolean
  onOpenChange?: ((isOpen: boolean) => void) | undefined
}> = ({ isOpen, onOpenChange }) => {
  return (
    <Modal
      size="full"
      isOpen={isOpen}
      placement="bottom"
      onOpenChange={onOpenChange}
      backdrop="transparent"
      classNames={{
        base: "bg-[#080A14] py-10 max-md:py-4 justify-center h-[calc(100dvh-95px)] min-h-[calc(100dvh-95px)] md:h-[calc(100dvh-110px)] md:min-h-[calc(100dvh-110px)] !justify-start !rounded-t-[32px]",
        wrapper: "z-[99]",
        backdrop: "z-[99]",
        closeButton: "bg-white left-4 top-4 z-[11] w-fit",
      }}
    >
      <ModalContent>
        <div className="overflow-y-auto">
          <Betting />
        </div>
      </ModalContent>
    </Modal>
  )
}

export default BetModal
