import DotLoading from "@components/DotLoading"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { DatabaseImportIcon } from "@components/Icons/DatabaseImportIcon"
import { FilledExclamationCircleIcon } from "@components/Icons/FilledExclamationCircleIcon"
import { ExploreFilledIcon } from "@components/Icons/MetamaskIcon"
import { PDFTypeIcon } from "@components/Icons/PDFTypeIcon"
import { PhotoPlusIcon } from "@components/Icons/PhotoPlusIcon"
import { ThreeDotsIcon } from "@components/Icons/SocialLinkIcon"
import useAuthState from "@hooks/useAuthState"
import useWindowSize from "@hooks/useWindowSize"
import IntroVideo from "../Modal/CreatPrivateAgentModal/IntroVideo"
import UploadDataButton from "../UploadDataButton"
import MainContainerCreate from "./MainContainerCreate"
import UploadCustom from "./UploadCustom"
import UploadSocialLink from "./UploadSocialLink"

export const TYPE_DATA_KEY = {
  SOCIAL_MEDIA: "social-media",
  CV_FILE: "cv-file",
  PDF_FILE: "pdf-file",
  PHOTO_VIDEO_FILE: "photo-video-file",
}

const CreatePrivateAgent: React.FC<{
  connectWalletLoading: boolean
  connectWallet: any
  setCreated?: any
  botId?: string | number
  onCallBack?: any
}> = ({
  connectWalletLoading,
  connectWallet,
  setCreated,
  botId,
  onCallBack,
}) => {
  const { isLogin, sessionAccessToken } = useAuthState()
  const { isMobile } = useWindowSize()

  const renderCreateAccountAction = () => {
    if (connectWalletLoading)
      return (
        <div className="absolute top-[15%] flex flex-col items-center gap-2">
          <ExploreFilledIcon />
          <div className="flex-items-center">
            <DotLoading />
            <span className="text-base font-medium">Creating your wallet</span>
          </div>
        </div>
      )

    return (
      <>
        <div className="flex-items-center absolute top-[15%] max-w-[390px] flex-col max-md:static">
          <FilledExclamationCircleIcon />
          <span
            className="cursor-pointer text-center text-24 text-mercury-800 max-md:text-18"
            onClick={() => connectWallet()}
          >
            <span className="font-semibold text-mercury-950">
              Connect wallet
            </span>
            <br />
            to start your own Private Agent.
          </span>
        </div>

        <UploadDataButton
          icon={
            <div className="flex-items-center mb-2 gap-1">
              <FilledBrainAIIcon color="#A2845E" size={24} />
              <ThreeDotsIcon />
              <DatabaseImportIcon />
            </div>
          }
          label="Drag & drop files here"
          isDisable
          radiusFull={true}
          customClassName="absolute max-md:static max-md:translate-y-0 top-[53%] -translate-y-1/2 w-[200px] h-[200px]"
        />

        <div className="absolute right-6 top-4 w-[240px] max-md:hidden">
          <IntroVideo />
        </div>
      </>
    )
  }

  const renderContainerCreateContent = () => {
    if (isMobile) {
      return (
        <div className="mt-[60px] flex w-full flex-col items-center">
          <div className="flex-items-center mb-2 gap-1">
            <FilledBrainAIIcon color="#A2845E" size={24} />
            <ThreeDotsIcon />
            <DatabaseImportIcon />
          </div>
          <span className="cursor-pointer text-center text-20 text-mercury-800">
            <span className="font-semibold text-mercury-950">
              Start your Private Agent
            </span>
            <br />
            by connect your data:
          </span>

          <div className="mt-6 max-h-[380px] w-full overflow-auto">
            <UploadSocialLink />

            <UploadCustom
              fieldkey="uploadCV"
              fileKey={TYPE_DATA_KEY.CV_FILE}
              icon={<PDFTypeIcon />}
              label="CV"
            />
            <div className="my-4">
              <UploadCustom
                fieldkey="uploadPDFs"
                fileKey={TYPE_DATA_KEY.PDF_FILE}
                icon={<PDFTypeIcon />}
                label="PDFs"
              />
            </div>
            <UploadCustom
              fieldkey="photosVideos"
              fileKey={TYPE_DATA_KEY.PHOTO_VIDEO_FILE}
              icon={<PhotoPlusIcon />}
              label="Photos & Videos"
              accept="image/*,video/*"
            />
          </div>
        </div>
      )
    }

    return (
      <>
        <div className="absolute top-[53%] flex -translate-y-1/2 items-center justify-center text-center">
          <span className="text-base text-mercury-800">
            Max file size: 50MB
          </span>
        </div>
        <div className="absolute top-[50px] h-full w-[650px]">
          <div className="mb-12 flex flex-col items-center justify-center text-center">
            <div className="flex-items-center gap-1">
              <FilledBrainAIIcon color="#A2845E" size={24} />
              <ThreeDotsIcon />
              <DatabaseImportIcon />
            </div>
            <span className="text-24">
              <span className="font-semibold">Start your Private Agent</span>
              <br />
              by connect your data:
            </span>
          </div>
          <div className="">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <UploadSocialLink />
                <UploadCustom
                  fieldkey="uploadCV"
                  fileKey={TYPE_DATA_KEY.CV_FILE}
                  icon={<PDFTypeIcon />}
                  label="CV"
                />
              </div>
              <div className="flex flex-col gap-6">
                <UploadCustom
                  fieldkey="uploadPDFs"
                  fileKey={TYPE_DATA_KEY.PDF_FILE}
                  icon={<PDFTypeIcon />}
                  label="PDFs"
                />
                <UploadCustom
                  fieldkey="photosVideos"
                  fileKey={TYPE_DATA_KEY.PHOTO_VIDEO_FILE}
                  icon={<PhotoPlusIcon />}
                  label="Photos & Videos"
                  accept="image/*,video/*"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (!isLogin || (isLogin && sessionAccessToken)) {
    return (
      <MainContainerCreate>{renderCreateAccountAction()}</MainContainerCreate>
    )
  }

  return (
    <MainContainerCreate
      setCreated={setCreated}
      botId={botId}
      onCallBack={onCallBack}
    >
      {renderContainerCreateContent()}
    </MainContainerCreate>
  )
}

export default CreatePrivateAgent
