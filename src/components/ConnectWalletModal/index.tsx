import CloseButton from "@components/CloseButton"
import { MetamaskIconSmall } from "@components/Icons/MetamaskIcon"
import useConnectWallet from "@hooks/useConnectWallet"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react"
import { IModalProps } from "types/modal"

const ConnectWalletModal = ({ isOpen, onClose }: IModalProps) => {
  const { loading, connectWallet } = useConnectWallet()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      classNames={{
        base: "bg-mercury-30",
        wrapper: "z-[99]",
        backdrop: "z-[99]",
      }}
      size="xs"
    >
      <ModalContent>
        <ModalHeader className="relative">
          <h3 className="flex-1 text-center text-24 font-semibold text-mercury-950">
            Connect Wallet
          </h3>
          <CloseButton
            onClose={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          />
        </ModalHeader>
        <ModalBody className="flex items-center justify-center py-4">
          <Button
            className="hover-light-effect group flex h-full w-full cursor-pointer items-center justify-center gap-4 rounded-full bg-mercury-100 p-2"
            onClick={connectWallet}
            isLoading={loading}
          >
            <MetamaskIconSmall width={40} height={38} />
            <span className="text-base-md text-20 group-hover:text-mercury-950">
              Metamask
            </span>
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ConnectWalletModal
