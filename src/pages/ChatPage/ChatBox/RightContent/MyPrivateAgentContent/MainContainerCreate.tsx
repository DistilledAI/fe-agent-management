import { desktopPrivateAgent } from "@assets/images"
import { FilledShieldCheckedIcon } from "@components/Icons/FilledShieldCheck"
import { Button } from "@nextui-org/react"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import CollectingModal from "../Modal/CreatPrivateAgentModal/CollectingModal"
import FYIModal from "../Modal/FYIModal"
import { useNavigate } from "react-router-dom"
import { PATH_NAMES } from "@constants/index"

const MainContainerCreate: React.FC<{
  children: React.ReactNode
  setCreated?: any
  botId?: number | string
  onCallBack?: any
}> = ({ children, setCreated, botId, onCallBack }) => {
  const navigate = useNavigate()
  const [openFYIPopup, setOpenFYIPopupp] = useState<boolean>(false)
  const [openCollectingPopup, setOpenCollectingPopup] = useState<boolean>(false)
  const methods = useForm<any>({
    defaultValues: {
      uploadCV: [],
      uploadSocialLink: [],
      uploadPDFs: [],
      photosVideos: [],
      txtFiles: [],
    },
  })

  return (
    <div
      className="relative mx-auto h-[calc(100dvh-110px)] w-full flex-1 overflow-y-auto bg-white bg-cover bg-center bg-no-repeat font-barlow md:h-[calc(100dvh-68px)]"
      style={{
        backgroundImage: `url(${desktopPrivateAgent})`,
      }}
    >
      <FormProvider {...methods}>
        <>
          {children}
          {botId ? (
            <div className="mx-auto flex w-[calc(100%-32px)] max-w-[800px] items-center gap-4 rounded-[22px] border border-mercury-200 bg-white p-4 max-md:bottom-[40px] max-md:mt-6 max-md:flex-col md:absolute md:bottom-10 md:left-1/2 md:w-full md:-translate-x-1/2 md:gap-6">
              <div>
                <p className="text-14 text-mercury-950">
                  Your data is protected through{" "}
                  <span className="font-bold">Confidential Computing (CC)</span>{" "}
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
                onClick={() => navigate(PATH_NAMES.MY_DATA)}
                className="h-14 min-w-[213px] rounded-full bg-mercury-950 px-6 text-[16px] text-mercury-30 max-md:h-[52px] max-md:w-full md:text-[18px]"
              >
                <span className="">View Data Sync Status</span>
              </Button>
            </div>
          ) : (
            <></>
          )}
        </>
      </FormProvider>
      <FYIModal openPopup={openFYIPopup} setOpenPopup={setOpenFYIPopupp} />
      <CollectingModal
        openPopup={openCollectingPopup}
        setOpenPopup={setOpenCollectingPopup}
        callbackChange={() => {
          if (onCallBack) onCallBack()
          if (setCreated) setCreated(true)
        }}
      />
    </div>
  )
}

export default MainContainerCreate
