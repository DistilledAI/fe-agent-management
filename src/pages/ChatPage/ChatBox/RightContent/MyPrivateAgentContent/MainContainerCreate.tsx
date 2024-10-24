import { FilledShieldCheckedIcon } from "@components/Icons/FilledShieldCheck"
import { Button } from "@nextui-org/react"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { createBot } from "services/chat"
import { mapMyDataToBot } from "services/user"
import CollectingModal from "../Modal/CreatPrivateAgentModal/CollectingModal"
import FYIModal from "../Modal/FYIModal"

const MainContainerCreate: React.FC<{
  children: React.ReactNode
  setCreated?: any
}> = ({ children, setCreated }) => {
  const [openFYIPopup, setOpenFYIPopupp] = useState<boolean>(false)
  const [openCollectingPopup, setOpenCollectingPopup] = useState<boolean>(false)
  const methods = useForm<any>({
    defaultValues: {
      uploadCV: [],
      uploadSocialLink: [],
      uploadPDFs: [],
      photosVideos: [],
    },
  })
  const values = methods.getValues()
  const uploadCVValues = values.uploadCV.length > 0 ? values.uploadCV : []
  const uploadSocialLinkValues =
    values.uploadSocialLink.length > 0 ? values.uploadSocialLink : []
  const uploadPDFsValues = values.uploadPDFs.length > 0 ? values.uploadPDFs : []
  const photosVideosValues =
    values.photosVideos.length > 0 ? values.photosVideos : []

  const isDisabled =
    uploadCVValues.length > 0 ||
    uploadSocialLinkValues.length > 0 ||
    uploadPDFsValues.length > 0 ||
    photosVideosValues.length > 0

  const onSubmit = async () => {
    setOpenCollectingPopup(true)
    const payloadData = [
      ...uploadCVValues,
      ...uploadSocialLinkValues,
      ...uploadPDFsValues,
      ...photosVideosValues,
    ]

    try {
      const createBotResponse = await createBot({ name: "Unnamed" })
      if (createBotResponse) {
        const botId = createBotResponse?.data?.id
        const payload = {
          botId,
          data: payloadData,
        }
        await mapMyDataToBot(payload)
        toast.success("created bot successfully")
        setOpenCollectingPopup(false)
        setCreated(true)
      }
    } catch (error) {
      console.log("error", error)
      setOpenCollectingPopup(false)
    } finally {
      setOpenCollectingPopup(false)
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <div className="relative h-full w-full flex-1">
          <div className="flex-items-center relative h-full w-full flex-col justify-between">
            {children}
            <div className="absolute bottom-[100px] flex items-center gap-2 rounded-[22px] border border-mercury-200 p-4 text-center max-sm:max-w-[320px]">
              <div>
                <span className="text-base-14 text-mercury-800">
                  Your Private Agent is exclusively accessible to you unless you
                  choose to publish it on the Marketplace.
                </span>
                <div
                  className="flex-items-center mt-2 cursor-pointer gap-2"
                  onClick={() => setOpenFYIPopupp(true)}
                >
                  <FilledShieldCheckedIcon color="#A2845E" />
                  <span className="text-base-14-md text-brown-10">
                    How do we protect your private data?
                  </span>
                </div>
              </div>

              <Button
                className="h-[44px] rounded-full bg-mercury-950 text-white max-sm:h-[36px]"
                onClick={() => onSubmit()}
                isDisabled={!isDisabled}
              >
                <span className="">Connect data</span>
              </Button>
            </div>
          </div>
        </div>
      </FormProvider>
      <FYIModal openPopup={openFYIPopup} setOpenPopup={setOpenFYIPopupp} />
      <CollectingModal
        openPopup={openCollectingPopup}
        setOpenPopup={setOpenCollectingPopup}
      />
    </>
  )
}

export default MainContainerCreate
