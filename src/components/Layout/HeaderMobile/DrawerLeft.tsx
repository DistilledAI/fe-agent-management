import React from "react"
import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react"
import { FilledWindowIcon } from "@components/Icons/FilledWindowIcon"
import { DatabaseSearchIcon } from "@components/Icons/DatabaseImportIcon"
import CloseButton from "@components/CloseButton"
import ComingSoon from "@components/ComingSoon"

interface Props {
  isOpen: boolean
  onClose: () => void
}

const MENU = [
  {
    name: "Playground",
    icon: <FilledWindowIcon />,
  },
  {
    name: "My data",
    icon: <DatabaseSearchIcon />,
  },
]

const DrawerLeft: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal
      scrollBehavior="inside"
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      backdrop="transparent"
      size="full"
      classNames={{
        wrapper: "flex justify-start",
      }}
      hideCloseButton
      motionProps={{
        variants: {
          enter: {
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeInOut",
            },
          },
          exit: {
            x: -100,
            opacity: 0,
            transition: {
              duration: 0.1,
              ease: "easeInOut",
            },
          },
        },
      }}
    >
      <ModalContent className="w-[80%] !rounded-br-[32px] !rounded-tr-[32px] border-r border-r-mercury-100 bg-mercury-70">
        <ModalBody className="gap-4 px-3 pt-10">
          <CloseButton onClose={onClose} />
          {MENU.map((item, index) => (
            <ComingSoon>
              <Button
                key={index}
                className="btn-primary min-h-[60px] w-full justify-start"
              >
                <div>{item.icon}</div>
                {item.name}
              </Button>
            </ComingSoon>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default DrawerLeft
