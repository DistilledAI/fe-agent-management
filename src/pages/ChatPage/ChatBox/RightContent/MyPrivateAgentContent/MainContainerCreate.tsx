import { desktopPrivateAgent } from "@assets/images"
import { FilledShieldCheckedIcon } from "@components/Icons/FilledShieldCheck"
import { Button } from "@nextui-org/react"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { mapMyDataToBot } from "services/user"
import { QueryDataKeys } from "types/queryDataKeys"
import CollectingModal from "../Modal/CreatPrivateAgentModal/CollectingModal"
import FYIModal from "../Modal/FYIModal"

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
      txtFiles: [],
    },
  })
  const values = methods.watch()
  const uploadCVValues = values.uploadCV.length > 0 ? values.uploadCV : []
  const uploadSocialLinkValues =
    values.uploadSocialLink.length > 0 ? values.uploadSocialLink : []
  const uploadPDFsValues = values.uploadPDFs.length > 0 ? values.uploadPDFs : []
  const photosVideosValues =
    values.photosVideos.length > 0 ? values.photosVideos : []
  const txtFilesValues = values.txtFiles.length > 0 ? values.txtFiles : []

  const isDisabled =
    uploadCVValues.length > 0 ||
    uploadSocialLinkValues.length > 0 ||
    uploadPDFsValues.length > 0 ||
    photosVideosValues.length > 0 ||
    txtFilesValues.length > 0

  const onSubmit = async () => {
    setOpenCollectingPopup(true)
    const payloadData = [
      ...uploadCVValues,
      ...uploadSocialLinkValues,
      ...uploadPDFsValues,
      ...photosVideosValues,
      ...txtFilesValues,
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
      className="relative mx-auto h-full w-full flex-1 overflow-y-auto bg-white bg-cover bg-center bg-no-repeat font-barlow"
      style={{
        backgroundImage: `url(${desktopPrivateAgent})`,
      }}
    >
      <FormProvider {...methods}>
        <div className="relative h-full w-full flex-1 max-md:px-4">
          <div className="relative flex h-full w-full flex-col items-center justify-between">
            {children}
            {botId ? (
              <div className="absolute bottom-16 flex max-w-[800px] items-center gap-6 rounded-[22px] border border-mercury-200 bg-white p-4 max-md:static max-md:bottom-[40px] max-md:mt-6 max-md:w-full max-md:flex-col">
                <div>
                  <p className="text-14 text-mercury-950">
                    Your data is protected through{" "}
                    <span className="font-bold">
                      Confidential Computing (CC)
                    </span>{" "}
                    within a{" "}
                    <span className="font-bold">
                      Trusted Execution Environment (TEE).
                    </span>
                  </p>
                  <div
                    className="flex-items-center mt-2 cursor-pointer gap-2 max-md:mb-2 max-md:justify-center"
                    onClick={() => setOpenFYIPopupp(true)}
                  >
                    <FilledShieldCheckedIcon color="#A2845E" />
                    <span className="text-16 font-medium text-brown-500">
                      How do we protect your private data?
                    </span>
                  </div>
                </div>

                <Button
                  className="h-14 min-w-[213px] rounded-full bg-mercury-950 px-6 text-[16px] text-mercury-30 max-md:h-[52px] max-md:w-full md:text-[18px]"
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
