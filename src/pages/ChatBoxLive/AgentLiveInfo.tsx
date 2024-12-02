import { solanaCircleIcon } from "@assets/svg"
import CloseButton from "@components/CloseButton"
import { InfoCircleOutlineIcon } from "@components/Icons/InfoCircleIcon"
import { ShareArrowIcon } from "@components/Icons/Share"
import { TelegramOutlineIcon } from "@components/Icons/SocialLinkIcon"
import { TwitterIcon } from "@components/Icons/Twitter"
import ShareQRModal from "@components/ShareQRModal"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react"
import { UserGroup } from "@pages/ChatPage/ChatBox/LeftBar/useFetchGroups"
import React, { useMemo } from "react"
import AgentDescription from "./AgentDescription"
import SocialButton from "./SocialButton"
import ContractDisplay from "./ContractDisplay"
import { AGENT_INFO_CLANS } from "@constants/index"

const AgentLiveInfo: React.FC<{
  groupDetail: UserGroup | null
}> = ({ groupDetail }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const {
    isOpen: isShareOpen,
    onClose: onShareClose,
    onOpen: onShareOpen,
  } = useDisclosure()

  const isMaxi =
    groupDetail?.group.label === "@maxisbuyin" ||
    groupDetail?.group.label === "@maxisbuyin_"

  const agentInfo = useMemo(
    () =>
      AGENT_INFO_CLANS.find(
        (agent) => agent.username === groupDetail?.group.label,
      ),
    [groupDetail?.group.label],
  )

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
          <ModalBody className="gap-3 px-3 py-4">
            <div className="flex items-center justify-between gap-3">
              <SocialButton
                icon={<TwitterIcon size={20} />}
                link={agentInfo?.xLink}
                isDisabled={!agentInfo?.xLink}
              />
              <SocialButton
                icon={<TelegramOutlineIcon size={20} />}
                link={agentInfo?.teleLink}
                isDisabled={!agentInfo?.teleLink}
              />
              <>
                <Button
                  className="h-14 w-full rounded-full bg-mercury-70 text-white md:h-10"
                  onClick={onShareOpen}
                  isDisabled={!agentInfo?.shareLink}
                >
                  <ShareArrowIcon />
                </Button>
                <ShareQRModal
                  title={agentInfo?.username}
                  isOpen={isShareOpen}
                  shareUrl={agentInfo?.shareLink || ""}
                  onClose={onShareClose}
                />
              </>
            </div>
            <ContractDisplay
              classNames={{
                wrapper: "mt-3",
              }}
              icon={agentInfo?.contract ? solanaCircleIcon : ""}
              value={agentInfo?.contract}
            />
            <AgentDescription groupDetail={groupDetail} isMaxi={isMaxi} />
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
