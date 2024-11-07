import { CloudUpload } from "@components/Icons/CloudUpload"
import { QRCodeIcon } from "@components/Icons/QRCode"
import { Button } from "@nextui-org/react"

const Header: React.FC = () => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-24 text-mercury-950">Unnamed1934</span>
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
        <Button className="h-[44px] rounded-full border border-mercury-50 bg-mercury-950">
          <span className="text-base text-mercury-30">Save</span>
        </Button>
      </div>
    </div>
  )
}
export default Header
