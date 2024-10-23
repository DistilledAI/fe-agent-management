import DotLoading from "@components/DotLoading"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { DatabaseImportIcon } from "@components/Icons/DatabaseImportIcon"
import { EmailUpIcon } from "@components/Icons/EmailUpIcon"
import { FilledExclamationCircleIcon } from "@components/Icons/FilledExclamationCircleIcon"
import { ExploreFilledIcon } from "@components/Icons/MetamaskIcon"
import { PDFTypeIcon } from "@components/Icons/PDFTypeIcon"
import { PhotoPlusIcon } from "@components/Icons/PhotoPlusIcon"
import { SocialLinkIcon, ThreeDotsIcon } from "@components/Icons/SocialLinkIcon"
import useAuthState from "@hooks/useAuthState"
import useWindowSize from "@hooks/useWindowSize"
import { useState } from "react"
import UploadDataButton from "../UploadDataButton"
import MainContainerCreate from "./MainContainerCreate"
import UploadCV from "./UploadCV"
import UploadSocialLink from "./UploadSocialLink"

const CreatePrivateAgent: React.FC<{
  connectWalletLoading: boolean
  connectWallet: any
  setCreated: any
}> = ({ connectWalletLoading, connectWallet }) => {
  const { isLogin, sessionAccessToken } = useAuthState()
  const { isMobile } = useWindowSize()
  const [socialUrls, setSocialUrls] = useState<string[]>([])
  const [cvFiles, setCVFiles] = useState<string[]>([])

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
      <div className="flex-items-center absolute top-[15%] max-w-[390px] flex-col">
        <FilledExclamationCircleIcon />
        <span
          className="cursor-pointer text-center text-24 text-mercury-800"
          onClick={() => connectWallet()}
        >
          <span className="font-semibold text-mercury-950">Connect wallet</span>
          <br />
          to start your own Private agent.
        </span>
      </div>
    )
  }

  const renderContainerCreateContent = () => {
    if (isMobile) {
      return (
        <div className="mt-[60px] flex flex-col items-center">
          <div className="flex-items-center mb-2 gap-1">
            <FilledBrainAIIcon color="#A2845E" size={24} />
            <ThreeDotsIcon />
            <DatabaseImportIcon />
          </div>
          <span className="cursor-pointer text-center text-20 text-mercury-800">
            <span className="font-semibold text-mercury-950">
              Start your Private agent
            </span>
            <br />
            by connect your data:
          </span>

          <div className="absolute top-1/2 -translate-y-1/2">
            <div className="mt-4 flex gap-3">
              <UploadDataButton
                icon={<PDFTypeIcon />}
                label="PDFs"
                isDisable
                textClassName="text-base-14-b"
                customClassName="h-[50px]"
              />
              <UploadDataButton
                icon={<EmailUpIcon />}
                label="Emails"
                isDisable
                textClassName="text-base-14-b"
                customClassName="h-[50px]"
              />
            </div>
            <UploadDataButton
              icon={<PhotoPlusIcon />}
              label="Photos & Videos"
              isDisable
              textClassName="text-base-14-b"
              customClassName="h-[50px] my-2"
            />
            <UploadDataButton
              icon={<SocialLinkIcon />}
              label="Website links/Social Media"
              textClassName="text-base-14-b"
              isDisable={false}
              customClassName="h-[50px]"
            />
          </div>
        </div>
      )
    }

    return (
      <div className="absolute top-[50px] h-full">
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <div className="flex-items-center gap-1">
            <FilledBrainAIIcon color="#A2845E" size={24} />
            <ThreeDotsIcon />
            <DatabaseImportIcon />
          </div>
          <span className="text-24">
            <span className="font-semibold">Start your Private agent</span>
            <br />
            by connect your data:
          </span>
        </div>

        <div className="">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <UploadSocialLink
                socialUrls={socialUrls}
                setSocialUrls={setSocialUrls}
              />
              <UploadCV cvFiles={cvFiles} setCVFiles={setCVFiles} />
            </div>
            <div>
              <UploadDataButton
                icon={<PDFTypeIcon />}
                label="PDFs"
                customClassName="mb-6"
                textClassName="text-base-14-b"
              />
              <UploadDataButton
                icon={<PhotoPlusIcon />}
                label="Photos & Videos"
                textClassName="text-base-14-b"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!isLogin || (isLogin && sessionAccessToken)) {
    return (
      <MainContainerCreate>{renderCreateAccountAction()}</MainContainerCreate>
    )
  }

  return (
    <>
      <MainContainerCreate>
        {renderContainerCreateContent()}
      </MainContainerCreate>
    </>
  )
}

export default CreatePrivateAgent
