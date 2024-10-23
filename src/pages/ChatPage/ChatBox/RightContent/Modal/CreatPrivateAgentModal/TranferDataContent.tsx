import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import useTextCreeping from "@hooks/useTextCreeping"
import { Button } from "@nextui-org/react"
import { PROFILE_TYPE } from "./ProfileLinkForm"
import WordCloundContent from "./WordCloundContent"

const LIST_TEXT_DEFAULT_2 = [
  "Your data is transferred to your own confidential pod.",
]

const TranferDataContent: React.FC<{
  setContentStep: any
  collectedData: any
  setOpenPopup: any
  handlemSetSocialUrls: any
}> = ({
  collectedData,
  setContentStep,
  setOpenPopup,
  handlemSetSocialUrls,
}) => {
  const { text: text2 } = useTextCreeping({ listText: LIST_TEXT_DEFAULT_2 })

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

  const onCloseModal = () => {
    setContentStep(1)
    setOpenPopup(false)
  }

  const handleSubmit = () => {
    handlemSetSocialUrls(profileLink)
    onCloseModal()
  }

  return (
    <div className="grid h-fit w-[800px] grid-cols-2 max-sm:w-full max-sm:grid-cols-none">
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
        <div>
          <div className="relative mb-4 max-w-[300px] text-base transition-all duration-500 ease-linear max-sm:mb-2">
            <span className="text-[24px] font-semibold text-mercury-950 max-sm:text-18">
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

        <div className="pb-8 max-sm:pb-0">
          <Button
            className="mt-4 w-full rounded-full bg-mercury-950"
            size="lg"
            onClick={() => handleSubmit()}
          >
            <span className="text-18 text-mercury-30">Got it!</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
export default TranferDataContent
