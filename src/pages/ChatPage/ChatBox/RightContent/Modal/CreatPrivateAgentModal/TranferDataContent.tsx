import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { CheckedIcon } from "@components/Icons/Checked"
import useTextCreeping from "@hooks/useTextCreeping"
import { Button, Input } from "@nextui-org/react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { createBot } from "services/chat"
import { PROFILE_TYPE } from "./ProfileLinkForm"
import WordCloundContent from "./WordCloundContent"

const LIST_TEXT_DEFAULT_2 = [
  "Your data is transferred to your own confidential pod.",
]

type Inputs = {
  email: string
}

const TranferDataContent: React.FC<{
  setContentStep: any
  collectedData: any
  setOpenPopup: any
  setCreated: any
}> = ({ collectedData, setContentStep, setOpenPopup, setCreated }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [isRequested, setRequested] = useState<boolean>(false)
  const { text: text2 } = useTextCreeping({ listText: LIST_TEXT_DEFAULT_2 })
  const { register, handleSubmit, watch } = useForm<Inputs>()
  const inputValue = watch("email")
  const profileType = collectedData?.profileType
  const userName = collectedData?.userName
  const aboutValue = collectedData?.about || ""
  const activitiesValue = collectedData?.activities || []
  const titleValues = activitiesValue
    ?.map((activity: any) => activity?.title)
    ?.join(" ")
  const paragraphValue = `${aboutValue} ${titleValues}`

  const profileLink =
    profileType === PROFILE_TYPE.LINKEDIN
      ? `https://linkedin.com/in/${userName}`
      : `https://x.com/${userName}`

  const callCreateBot = async (data: any) => {
    try {
      const payloadData = {
        name: userName,
        email: data?.email,
        linkedin: profileLink,
      }
      const res = await createBot(payloadData)
      if (res) {
        setLoading(false)
        setRequested(true)
      }
    } catch (error: any) {
      console.log("error", error)
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data) callCreateBot(data)
  }

  const onCloseModal = () => {
    setContentStep(1)
    setOpenPopup(false)
    setCreated(true)
  }

  const renderLeftContent = () => {
    if (isRequested) {
      return (
        <div>
          <div className="relative mb-4 flex max-w-[300px] items-center gap-2 text-base transition-all duration-500 ease-linear">
            <CheckedIcon />
            <span className="text-[24px] font-semibold leading-9 text-mercury-950">
              Creation requested!
            </span>
          </div>

          <span className="text-base-14 text-mercury-800">
            You will <span className="font-bold">receive a notification</span>{" "}
            when your private intelligence is{" "}
            <span className="font-bold">ready on the pod.</span>
          </span>
        </div>
      )
    }

    return (
      <div>
        <div className="relative mb-4 max-w-[300px] text-base transition-all duration-500 ease-linear">
          <span className="text-[24px] font-semibold text-mercury-950">
            {text2}
          </span>
        </div>

        <span className="text-base-14 text-mercury-800">
          Enter your email to{" "}
          <span className="font-bold">receive a notification</span> when your
          private intelligence is{" "}
          <span className="font-bold">ready on the pod.</span>
        </span>
      </div>
    )
  }

  return (
    <div className="max-sm:grid-cols-none max-sm:w-full grid h-fit w-[800px] grid-cols-2">
      <div className="w-full">
        <div className="flex-items-center mb-2 w-full gap-4">
          <div className="flex-items-center h-9 w-9 justify-center rounded-full bg-yellow-10">
            <FilledBrainAIIcon />
          </div>
          <div className="flex flex-col">
            <span className="text-base-b">Data collected on:</span>
            <span className="text-base">{profileLink}</span>
          </div>
        </div>
        <div>
          <WordCloundContent paragraph={paragraphValue} />
        </div>
      </div>
      <div className="flex flex-col justify-between">
        {renderLeftContent()}
        <div className="pb-8">
          {!isRequested && (
            <Input
              placeholder="Email address"
              labelPlacement="outside"
              classNames={{
                inputWrapper:
                  "!bg-mercury-200 rounded-full mt-8 !border !border-mercury-400",
                innerWrapper: "!bg-mercury-200 rounded-full",
                input: "text-18 !text-mercury-950 caret-[#363636]",
              }}
              size="lg"
              {...register("email")}
            />
          )}
          {isRequested ? (
            <Button
              className="mt-4 w-full rounded-full bg-mercury-950"
              size="lg"
              onClick={() => onCloseModal()}
            >
              <span className="text-18 text-mercury-30">Got it!</span>
            </Button>
          ) : (
            <Button
              className="mt-4 w-full rounded-full bg-mercury-950"
              size="lg"
              onClick={handleSubmit(onSubmit)}
              disabled={!inputValue}
              isLoading={loading}
            >
              <span className="text-18 text-mercury-30">Enter waitlist</span>
              <div className="rotate-180">
                <ArrowLeftFilledIcon color="#FAFAFA" />
              </div>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
export default TranferDataContent
