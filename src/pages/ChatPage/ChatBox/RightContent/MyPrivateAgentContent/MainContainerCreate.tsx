import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { FilledShieldCheckedIcon } from "@components/Icons/FilledShieldCheck"
import { Button } from "@nextui-org/react"
import mainContentBg from "assets/images/main-content-bg.jpg"
import { useState } from "react"
import FYIModal from "../Modal/FYIModal"
import UploadDataButton from "../UploadDataButton"

const MainContainerCreate: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [openFYIPopup, setOpenFYIPopupp] = useState<boolean>(false)

  return (
    <>
      <div
        className="relative h-full w-full flex-1 rounded-[22px] border border-white bg-mercury-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${mainContentBg})`,
        }}
      >
        <div className="flex-items-center relative h-full w-full flex-col justify-between">
          <UploadDataButton
            icon={<FilledBrainAIIcon />}
            label="Start your Private Agent"
            isDisable
            radiusFull={true}
            customClassName=" absolute top-1/2 -translate-y-1/2"
          />
          {children}
          <div className="absolute bottom-[60px] flex items-center gap-2 rounded-[22px] border border-mercury-200 p-4 text-center max-sm:max-w-[320px]">
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
              // isLoading={loading}
              // onClick={connectWallet}
              isDisabled
            >
              <span className="">Connect data</span>
            </Button>
          </div>
        </div>
      </div>
      <FYIModal openPopup={openFYIPopup} setOpenPopup={setOpenFYIPopupp} />
    </>
  )
}

export default MainContainerCreate
