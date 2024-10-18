import DotLoading from "@components/DotLoading"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { DatabaseImportIcon } from "@components/Icons/DatabaseImportIcon"
import { EmailUpIcon } from "@components/Icons/EmailUpIcon"
import { FilledExclamationCircleIcon } from "@components/Icons/FilledExclamationCircleIcon"
import { ExploreFilledIcon } from "@components/Icons/MetamaskIcon"
import { PDFTypeIcon } from "@components/Icons/PDFTypeIcon"
import { PhotoPlusIcon } from "@components/Icons/PhotoPlusIcon"
import { SocialLinkIcon, ThreeDotsIcon } from "@components/Icons/SocialLinkIcon"
import { useAppSelector } from "@hooks/useAppRedux"
import { useHover } from "@hooks/useHover"
import useWindowSize from "@hooks/useWindowSize"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import CreatPrivateAgentModal from "../Modal/CreatPrivateAgentModal"
import UploadDataButton from "../UploadDataButton"
import MainContainerCreate from "./MainContainerCreate"

const CreatePrivateAgent: React.FC<{
  connectWalletLoading: boolean
  connectWallet: any
  setCreated: any
}> = ({ connectWalletLoading, connectWallet, setCreated }) => {
  const isLogin = useAppSelector((state) => state.user.isLogin)
  const [openPopup, setOpenPopup] = useState<boolean>(false)
  const [ref, isHovered] = useHover()
  const { isMobile } = useWindowSize()

  const renderCreateAccountAction = () => {
    if (connectWalletLoading)
      return (
        <div className="absolute top-1/2 flex -translate-y-[230px] flex-col items-center gap-2">
          <ExploreFilledIcon />
          <div className="flex-items-center">
            <DotLoading />
            <span className="text-base font-medium">Creating your wallet</span>
          </div>
        </div>
      )

    return (
      <div className="flex-items-center absolute top-1/2 max-w-[390px] -translate-y-[230px] flex-col">
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
              onClick={() => setOpenPopup(true)}
              customClassName="h-[50px]"
            />
          </div>
        </div>
      )
    }

    return (
      <div className="absolute h-[60%] w-[80%]" ref={ref}>
        <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
          <UploadDataButton
            icon={
              <div className="flex-items-center gap-1">
                <FilledBrainAIIcon color="#A2845E" size={24} />
                <ThreeDotsIcon />
                <DatabaseImportIcon />
              </div>
            }
            label="Create your Private Agent"
            isDisable={false}
            radiusFull
          />
        </div>
        <div
          className={twMerge(
            "absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out",
            isHovered && "top-1/4 -translate-x-[200px]",
          )}
        >
          <UploadDataButton
            icon={<PDFTypeIcon />}
            label="PDFs"
            isDisable={true}
            radiusFull
          />
        </div>
        <div
          className={twMerge(
            "absolute right-1/2 top-1/2 z-20 -translate-y-1/2 translate-x-1/2 transition-all duration-500 ease-out",
            isHovered && "top-1/4 translate-x-[200px]",
          )}
        >
          <UploadDataButton
            icon={<EmailUpIcon />}
            label="Emails"
            isDisable={true}
            radiusFull
          />
        </div>
        <div
          className={twMerge(
            "absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out",
            isHovered && "-translate-x-[280px] -translate-y-1/4",
          )}
        >
          <UploadDataButton
            icon={<PhotoPlusIcon />}
            label="Photos & Videos"
            isDisable={true}
            radiusFull
          />
        </div>
        <div
          className={twMerge(
            "absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out",
            isHovered && "-translate-y-1/4 translate-x-[120px]",
          )}
          onClick={() => {
            setOpenPopup(true)
          }}
        >
          <UploadDataButton
            icon={<SocialLinkIcon />}
            label="Website links (including Social Media)"
            isDisable={false}
            radiusFull
          />
        </div>
      </div>
    )
  }

  if (!isLogin) {
    return (
      <MainContainerCreate>
        {renderCreateAccountAction()}
        <UploadDataButton
          icon={<FilledBrainAIIcon />}
          label="Start your Private Agent"
          isDisable
          radiusFull={true}
        />
      </MainContainerCreate>
    )
  }

  return (
    <>
      <MainContainerCreate>
        {renderContainerCreateContent()}
      </MainContainerCreate>

      <CreatPrivateAgentModal
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        setCreated={setCreated}
      />
    </>
  )
}

export default CreatePrivateAgent
