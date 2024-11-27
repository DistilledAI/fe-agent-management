import { creditBg } from "@assets/images"
import { CrowIcon } from "@components/Icons/Pencil"
import { Button } from "@nextui-org/react"

const MyPoints = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${creditBg})`,
      }}
      className="h-full rounded-[22px] border-1 bg-cover bg-center bg-no-repeat p-4 md:px-6 md:py-8"
    >
      <div className="mb-2 flex items-center justify-between leading-none">
        <span className="font-medium text-mercury-300">My Points</span>
        <span className="text-[32px] font-bold text-white">0</span>
      </div>
      <div className="mb-6 flex items-center justify-between leading-none">
        <span className="font-medium text-mercury-600">Balance:</span>
        <span className="font-medium text-mercury-600">($-)</span>
      </div>

      <div className="my-6 flex items-center justify-between leading-none">
        <span className="font-medium text-mercury-600">Level:</span>
        <span className="font-medium text-mercury-600">Coming soon</span>
      </div>

      <div className="flex items-center justify-between gap-1">
        <Button className="w-full rounded-full border border-mercury-900 bg-mercury-900/20 text-[14px] font-medium text-white max-md:min-h-12 md:text-[16px]">
          Earn more points
        </Button>
        <Button className="w-full rounded-full !border !border-mercury-900 bg-[rgba(195,195,195,0.20)] text-[14px] font-medium text-white max-md:min-h-12 md:text-[16px]">
          <div className="flex items-center gap-1">
            <CrowIcon />
            Get Premium TEE
          </div>
        </Button>
      </div>
    </div>
  )
}

export default MyPoints
