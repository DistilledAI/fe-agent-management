import DotLoading from "@components/DotLoading"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { DatabaseImportIcon } from "@components/Icons/DatabaseImportIcon"
import { MessageFilledIcon } from "@components/Icons/Message"
import { PDFTypeIcon } from "@components/Icons/PDFTypeIcon"
import { PhotoPlusIcon } from "@components/Icons/PhotoPlusIcon"
import { ThreeDotsIcon } from "@components/Icons/SocialLinkIcon"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import useWindowSize from "@hooks/useWindowSize"
import { Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
import AgentInitialization from "./AgentInitialization"
import MainContainerCreate from "./MainContainerCreate"
import UploadCustom from "./UploadCustom"
import UploadSocialLink from "./UploadSocialLink"
import VideoCustom from "@components/VideoCustom"
import { introPrivateAgentVideo } from "@assets/video"

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
}> = ({ connectWalletLoading, connectWallet }) => {
  const { isLogin, sessionAccessToken } = useAuthState()
  const { isMobile } = useWindowSize()
  const navigate = useNavigate()

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

    return <AgentInitialization />
  }

  if (!isLogin || (isLogin && sessionAccessToken)) {
    return (
      <MainContainerCreate>
        <div className="absolute left-1/2 top-1/2 w-full max-w-[768px] -translate-x-1/2 -translate-y-1/2">
          {connectWalletLoading && (
            <div className="mb-6 flex flex-col items-center gap-2">
              <div className="flex-items-center">
                <DotLoading />
                <span className="text-base font-medium">
                  Connecting your wallet
                </span>
              </div>
            </div>
          )}
          <div className="flex gap-6">
            <VideoCustom
              videoSrc={introPrivateAgentVideo}
              classNames={{
                wrapper:
                  "rounded-[22px] border border-mercury-70 overflow-hidden flex-1 bg-mercury-30",
                video: "h-full object-cover",
              }}
              isPlayIcon
              isFullScreenIcon
            />
            <div className="flex w-full flex-1 flex-col items-center rounded-[22px] border border-mercury-70 bg-mercury-30 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FC0]">
                <FilledBrainAIIcon color="#363636" size={24} />
              </div>
              <h3 className="my-2 text-[24px] font-semibold text-mercury-950">
                Start your own Private agent
              </h3>
              <h4 className="text-center text-base text-mercury-800">
                Your <span className="font-bold">private agents</span>. Built
                with your <span className="font-bold">private data</span>.
                Protected by your <span className="font-bold">private key</span>
                .
              </h4>
              <Button
                className="mt-6 h-[56px] w-full rounded-full bg-mercury-950 text-[18px] text-mercury-30"
                onClick={connectWallet}
              >
                Connect Wallet
              </Button>
            </div>
          </div>

          <div className="mt-6 flex w-full flex-col items-center rounded-[22px] border border-mercury-70 bg-mercury-30 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mercury-200">
              <MessageFilledIcon />
            </div>
            <h3 className="my-2 text-[24px] font-semibold text-mercury-950">
              Start a new chat
            </h3>
            <h4 className="text-base text-mercury-800">
              Explore the <span className="font-bold">Marketplace</span> to chat
              with a public agent, interact with an AI Companion and more
            </h4>
            <Button
              className="mt-6 h-[56px] w-full rounded-full bg-mercury-100 text-[18px] text-mercury-950"
              onClick={() => navigate(PATH_NAMES.MARKETPLACE)}
            >
              Go to Marketplace
            </Button>
          </div>
        </div>
      </MainContainerCreate>
    )
  }

  return <div>{renderContainerCreateContent()}</div>
}

export default CreatePrivateAgent
