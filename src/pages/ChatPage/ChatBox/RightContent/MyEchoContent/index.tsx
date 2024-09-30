import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledExclamationCircleIcon } from "@components/Icons/FilledExclamationCircleIcon"
import { FilledShieldCheckedIcon } from "@components/Icons/FilledShieldCheck"
import { ExploreFilledIcon } from "@components/Icons/MetamaskIcon"
import { useAppSelector } from "@hooks/useAppRedux"
import mainContentBg from "assets/images/main-content-bg.jpg"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import HugeButton from "../HugeButton"

const MyEchoContent: React.FC<{ connectWalletLoading: boolean }> = ({
  connectWalletLoading,
}) => {
  const isLogin = useAppSelector((state) => state.user.isLogin)
  const [isHover, setIsHover] = useState<boolean>(false)
  console.log("🚀 ~ isHover:", isHover)

  const renderCreateWalletAction = () => {
    if (connectWalletLoading)
      return (
        <div className="absolute top-[60px] flex flex-col items-center gap-2">
          <ExploreFilledIcon />
          <span className="text-base font-medium">
            &#8226; Creating your wallet
          </span>
        </div>
      )

    return (
      <div className="flex-items-center absolute top-[60px] max-w-[390px] flex-col">
        <FilledExclamationCircleIcon />
        <span className="text-center text-24 text-mercury-800">
          Please{" "}
          <span className="font-semibold text-mercury-950">
            Create a wallet
          </span>{" "}
          <br />
          to start your own intelligence agent.
        </span>
      </div>
    )
  }

  if (!isLogin) {
    return (
      <div
        className="h-full w-full flex-1 rounded-[22px] border border-white bg-mercury-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${mainContentBg})`,
        }}
      >
        <div className="flex-items-center relative h-full w-full flex-col justify-center">
          {renderCreateWalletAction()}
          <HugeButton
            icon={<FilledBrainAIIcon />}
            label="Create your Echo Agent"
            isDisable
          />
          <div className="absolute bottom-[60px] flex items-center gap-2">
            <FilledShieldCheckedIcon />
            <span className="text-base-m text-mercury-800">
              How Your Data is Secure in Private Intelligence?
            </span>
          </div>
        </div>
      </div>
    )
  }

  const toggleHover = () => {
    setIsHover(!isHover)
  }

  return (
    <div
      className="h-full w-full flex-1 rounded-[22px] border border-white bg-mercury-30 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${mainContentBg})`,
      }}
    >
      <div className="flex-items-center relative h-full w-full flex-col justify-center">
        <div
          className="absolute z-50 h-[60%] w-[80%]"
          onMouseEnter={() => toggleHover()}
          onMouseLeave={() => toggleHover()}
        />
        <div className="z-40">
          <HugeButton
            icon={<FilledBrainAIIcon />}
            label="Create your Echo Agent"
            isDisable={false}
          />
        </div>

        <div
          className={twMerge(
            "absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out",
            isHover && "top-1/3 -translate-x-[200px]",
          )}
        >
          <HugeButton
            icon={<FilledBrainAIIcon />}
            label="PDPs"
            isDisable={false}
          />
        </div>

        <div
          className={twMerge(
            "absolute right-1/2 top-1/2 z-30 -translate-y-1/2 translate-x-1/2 transition-all duration-500 ease-out",
            isHover && "top-1/3 translate-x-[200px]",
          )}
        >
          <HugeButton
            icon={<FilledBrainAIIcon />}
            label="Emails"
            isDisable={false}
          />
        </div>

        <div
          className={twMerge(
            "absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out",
            isHover && "-translate-x-[280px] -translate-y-1/3",
          )}
        >
          <HugeButton
            icon={<FilledBrainAIIcon />}
            label="Photos & Videos"
            isDisable={false}
          />
        </div>

        <div
          className={twMerge(
            "absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out",
            isHover && "-translate-y-1/3 translate-x-[120px]",
          )}
        >
          <HugeButton
            icon={<FilledBrainAIIcon />}
            label="Website links (including Social Media)"
            isDisable={false}
          />
        </div>

        <div className="absolute bottom-[60px] flex items-center gap-2">
          <FilledShieldCheckedIcon />
          <span className="text-base-m text-mercury-800">
            How Your Data is Secure in Private Intelligence?
          </span>
        </div>
      </div>
    </div>
  )
}
export default MyEchoContent
