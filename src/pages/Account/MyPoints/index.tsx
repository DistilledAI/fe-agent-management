import { creditBg, xDSTL } from "@assets/images"
import { AccountInfo, WarningIcon } from "@components/Icons"
import KycModal from "@components/KycModal"
import { PATH_NAMES } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { Button, useDisclosure } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

const MyPoints = () => {
  const { user } = useAuthState()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const totalxDstlPoint = user?.xDstlPoint || 0

  return (
    <div
      style={{
        backgroundImage: `url(${creditBg})`,
      }}
      className="h-full rounded-[22px] border-1 bg-cover bg-center bg-no-repeat p-4 md:px-6 md:py-8"
    >
      <div className="mb-2 flex items-center justify-between leading-none">
        <span className="font-medium text-mercury-300">My Points</span>
        <div className="flex items-center gap-2">
          <img src={xDSTL} width={24} height={24} />
          <span className="text-[32px] font-bold text-white">
            {totalxDstlPoint}
          </span>
        </div>
      </div>
      {/* <div className="mb-6 flex items-center justify-between leading-none">
        <span className="font-medium text-mercury-600">Balance:</span>
        <span className="font-medium text-mercury-600">
          {totalxDstlPoint} xDSTL ($-)
        </span>
      </div> */}

      <div className="mt-3 flex items-center justify-between leading-none">
        <span className="font-medium text-mercury-600">KYC Verification:</span>
        <div className="flex items-center gap-1 text-[#F78500]">
          <WarningIcon color="#F78500" /> Unverified
        </div>
      </div>

      <p className="mb-3 mt-1 text-[#F78500]">
        Complete your KYC verification to earn xDSTL and farm EXP on Clan.
      </p>

      <div className="flex items-center justify-between gap-1">
        <Button
          className="w-full rounded-full border border-mercury-900 bg-mercury-900/20 text-[14px] font-medium text-white max-md:min-h-12 md:text-[16px]"
          onClick={() => navigate(PATH_NAMES.REWARDS)}
        >
          Earn more points
        </Button>
        <Button
          onClick={onOpen}
          className="w-full rounded-full !border !border-mercury-900 bg-[rgba(195,195,195,0.20)] text-[14px] font-medium text-white max-md:min-h-12 md:text-[16px]"
        >
          <div className="flex items-center gap-1">
            <AccountInfo />
            Verify Account
          </div>
        </Button>
      </div>
      <KycModal isOpen={isOpen} onClose={onClose} />
    </div>
  )
}

export default MyPoints
