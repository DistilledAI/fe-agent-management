import distilledAiPrivateAgent from "@assets/video/distilled-ai-private-agent-3d.mp4"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { Button, Input, Modal, ModalContent } from "@nextui-org/react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import CollectingContent from "./CollectingContent"
import TranferDataContent from "./TranferDataContent"

type Inputs = {
  linkedIn: string
}

const CreatPrivateAgentModal: React.FC<{
  openPopup: boolean
  setOpenPopup: any
}> = ({ openPopup, setOpenPopup }) => {
  const [contentStep, setContentStep] = useState<number>(1)
  const { register, handleSubmit, watch } = useForm<Inputs>()
  const linkedInValue = watch("linkedIn")
  const onOpenChange = () => {
    setOpenPopup(!openPopup)
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setContentStep(2)
    console.log(data, "data")
  }

  const renderModalContent = () => {
    switch (contentStep) {
      case 2:
        return <CollectingContent />

      case 3:
        return <TranferDataContent />

      default:
        return (
          <>
            <span className="text-[24px] font-semibold text-mercury-950">
              Website links (including Social Media)
            </span>
            <Input
              placeholder="Enter your profile link"
              labelPlacement="outside"
              startContent={
                <div className="flex-items-center rounded-full bg-mercury-30 px-2 py-[6px]">
                  <span className="text-16 text-mercury-950">LinkedIn</span>
                  <ChevronDownIcon />
                </div>
              }
              classNames={{
                inputWrapper:
                  "!bg-mercury-200 rounded-full mt-4 !border !border-mercury-400 px-2",
                innerWrapper: "!bg-mercury-200 rounded-full",
                input: "text-18 !text-mercury-950 caret-[#363636]",
              }}
              size="lg"
              {...register("linkedIn")}
            />
            <Button
              className="mt-4 w-full rounded-full bg-mercury-950"
              size="lg"
              onClick={handleSubmit(onSubmit)}
              isDisabled={!linkedInValue}
            >
              <span className="text-18 text-mercury-30">Connect</span>
            </Button>
          </>
        )
    }
  }

  return (
    <Modal
      isOpen={openPopup}
      onOpenChange={onOpenChange}
      hideCloseButton
      classNames={{
        base: "bg-white",
      }}
      size="5xl"
    >
      <ModalContent>
        <div className="relative h-[680px] w-full">
          <div className="flex-items-center absolute left-0 top-4 z-10 w-full justify-between px-4">
            <span className="text-[24px] font-semibold text-mercury-950">
              Create Private Agent
            </span>
            <div className="z-50 cursor-pointer" onClick={onOpenChange}>
              <CloseFilledIcon color="#545454" />
            </div>
          </div>

          <video
            autoPlay
            playsInline
            loop
            muted
            className="h-full object-cover"
          >
            <source src={distilledAiPrivateAgent} type="video/mp4" />
            <track kind="captions"></track>
          </video>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-[22px] border border-white bg-[rgba(244,244,245,0.50)] p-6">
            {renderModalContent()}
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}
export default CreatPrivateAgentModal
