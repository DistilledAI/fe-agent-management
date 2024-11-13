import { desktopPrivateAgent } from "@assets/images"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { mapMyDataToBot } from "services/user"
import { QueryDataKeys } from "types/queryDataKeys"
import CollectingModal from "../Modal/CreatPrivateAgentModal/CollectingModal"
import FYIModal from "../Modal/FYIModal"
import { FilledShieldCheckedIcon } from "@components/Icons/FilledShieldCheck"
import { Button } from "@nextui-org/react"

const MainContainerCreate: React.FC<{
  children: React.ReactNode
  setCreated?: any
  botId?: number | string
  onCallBack?: any
}> = ({ children, setCreated, botId, onCallBack }) => {
  const [isCollected, setIsCollected] = useState(false)
  const [openFYIPopup, setOpenFYIPopupp] = useState<boolean>(false)
  const [openCollectingPopup, setOpenCollectingPopup] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const methods = useForm<any>({
    defaultValues: {
      uploadCV: [],
      uploadSocialLink: [],
      uploadPDFs: [],
      photosVideos: [],
    },
  })
  const values = methods.watch()
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
      if (botId) {
        const payload = {
          botId,
          data: payloadData,
        }
        await mapMyDataToBot(payload)
        toast.success("Updated bot successfully")
        queryClient.refetchQueries({ queryKey: [QueryDataKeys.MY_BOT_LIST] })
        setIsCollected(true)
        return
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
      console.log("error", error)
      setOpenCollectingPopup(false)
    }
  }

  return (
    <div
      className="relative mx-auto h-full w-full flex-1 rounded-[22px] border border-white bg-white bg-cover bg-center bg-no-repeat font-barlow"
      style={{
        backgroundImage: `url(${desktopPrivateAgent})`,
      }}
    >
      <FormProvider {...methods}>
        <div className="relative h-full w-full flex-1 max-md:h-auto max-md:px-3 max-md:pb-[80px]">
          <div className="flex-items-center relative h-full w-full flex-col justify-between">
            {children}
            {botId ? (
              <div className="absolute bottom-[100px] flex items-center gap-2 rounded-[22px] border border-mercury-200 bg-white p-4 text-center max-md:static max-md:bottom-[40px] max-md:mt-6 max-md:w-full max-md:flex-col">
                <div>
                  <span className="text-base-14 text-mercury-800">
                    Your Private Agent is exclusively accessible to you unless
                    you choose to publish it on the Marketplace.
                  </span>
                  <div
                    className="flex-items-center mt-2 cursor-pointer gap-2 max-md:mb-2 max-md:justify-center"
                    onClick={() => setOpenFYIPopupp(true)}
                  >
                    <FilledShieldCheckedIcon color="#A2845E" />
                    <span className="text-base-14-md text-brown-10">
                      How do we protect your private data?
                    </span>
                  </div>
                </div>

                <Button
                  className="h-[44px] rounded-full bg-mercury-950 text-white max-md:h-[52px] max-md:w-full"
                  onClick={() => onSubmit()}
                  isDisabled={!isDisabled}
                >
                  <span className="">View Data Sync Status</span>
                </Button>
              </div>
            ) : (
              <></>
            )}

            <button onSubmit={onSubmit}></button>
          </div>
        </div>
      </FormProvider>
      <FYIModal openPopup={openFYIPopup} setOpenPopup={setOpenFYIPopupp} />
      <CollectingModal
        openPopup={openCollectingPopup}
        setOpenPopup={setOpenCollectingPopup}
        callbackChange={() => {
          if (onCallBack) onCallBack()
          if (setCreated) setCreated(true)
        }}
        isCollected={isCollected}
      />
    </div>
  )
}

export default MainContainerCreate
