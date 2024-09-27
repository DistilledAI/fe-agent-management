import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledExclamationCircleIcon } from "@components/Icons/FilledExclamationCircleIcon"
import { FilledShieldCheckedIcon } from "@components/Icons/FilledShieldCheck"
import mainContentBg from "assets/images/main-content-bg.jpg"
import HugeButton from "../HugeButton"

const MyEchoContent: React.FC = () => {
  const isFirstMessage = true

  if (isFirstMessage) {
    return (
      <div
        className="h-full w-full flex-1 rounded-[22px] border border-white bg-mercury-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${mainContentBg})`,
        }}
      >
        <div className="flex-items-center relative h-full w-full flex-col justify-center">
          <div className="flex-items-center absolute top-1/2 max-w-[390px] -translate-y-[300px] flex-col">
            <FilledExclamationCircleIcon />
            <span className="text-mercury-800 text-center text-24">
              Please{" "}
              <span className="font-semibold text-mercury-950">
                Create a wallet
              </span>{" "}
              <br />
              to start your own intelligence agent.
            </span>
          </div>

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

  return (
    <div className="h-full flex-1 rounded-[22px] border border-white bg-mercury-30 py-6">
      hic
    </div>
  )
}
export default MyEchoContent
