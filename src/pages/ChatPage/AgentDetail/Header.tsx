import { CloudUpload } from "@components/Icons/CloudUpload"
import { QRCodeIcon } from "@components/Icons/QRCode"
import { Button } from "@nextui-org/react"
import { IAgentData } from "types/user"

const Header: React.FC<{ agentData: IAgentData }> = ({ agentData }) => {
  const userNameData = agentData?.username

  return (
    <div className="flex items-center justify-center bg-lgd-muted-beige p-3">
      <div className="flex w-full max-w-[800px] items-center justify-between px-4">
        <div className="flex flex-col">
          <span className="text-24 font-semibold text-mercury-950">
            {userNameData}
          </span>
          <span className="text-base font-medium text-mercury-500">
            No publish yet
          </span>
        </div>
        <div className="flex gap-3">
          <Button className="h-[44px] rounded-full border border-mercury-50 bg-mercury-100">
            <QRCodeIcon />
            <span className="text-base text-mercury-950">Share as QR</span>
          </Button>
          <Button className="h-[44px] rounded-full border border-mercury-50 bg-mercury-100">
            <CloudUpload />
            <span className="text-base text-mercury-950">Publish</span>
          </Button>
          <Button
            className="h-[44px] rounded-full border border-mercury-50 bg-mercury-950"
            type="submit"
          >
            <span className="text-base text-mercury-30">Save</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Header
