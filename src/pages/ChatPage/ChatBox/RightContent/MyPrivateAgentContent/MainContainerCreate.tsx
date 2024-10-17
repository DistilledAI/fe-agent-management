import { FilledShieldCheckedIcon } from "@components/Icons/FilledShieldCheck"
import mainContentBg from "assets/images/main-content-bg.jpg"
import { useState } from "react"
import FYIModal from "../Modal/FYIModal"

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
        <div className="flex-items-center relative h-full w-full flex-col justify-center">
          {children}
          <div className="absolute bottom-[60px] text-center max-sm:max-w-[380px]">
            <span className="text-base-m text-mercury-800">
              Your Private Agent is exclusively accessible to you unless you
              choose to publish it on the Marketplace.
            </span>

            <div
              className="flex-items-center mt-2 cursor-pointer justify-center gap-2"
              onClick={() => setOpenFYIPopupp(true)}
            >
              <FilledShieldCheckedIcon color="#A2845E" />
              <span className="text-base-m text-brown-10">
                How do we protect your private data?
              </span>
            </div>
          </div>
        </div>
      </div>
      <FYIModal openPopup={openFYIPopup} setOpenPopup={setOpenFYIPopupp} />
    </>
  )
}

export default MainContainerCreate
