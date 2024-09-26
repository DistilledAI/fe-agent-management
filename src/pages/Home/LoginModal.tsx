import useLogin from "@hooks/useLogin"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react"
import React from "react"

interface Props {
  isOpen: boolean
  onOpenChange: () => void
}

const LoginModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const handleLogin = useLogin()

  return (
    <Modal
      size="xs"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 dark:text-neutral-suface">LLM Layer</ModalHeader>
            <ModalBody className="items-center pb-6">
              <Button
                radius="full"
                className="btn-primary w-40"
                onClick={handleLogin}
              >
                Log in
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default LoginModal
