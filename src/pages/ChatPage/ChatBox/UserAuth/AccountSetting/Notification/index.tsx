import { NotiOutlineIcon } from "@components/Icons/Notification"
import { Switch } from "@nextui-org/react"

const NotificationSetting = () => {
  return (
    <div className="rounded-[22px] border-1 border-white bg-mercury-30 p-4">
      <div className="mb-[22px] flex items-center gap-2">
        <NotiOutlineIcon />
        <span className="font-medium text-mercury-600">Agent Notification</span>
      </div>
      <Switch defaultSelected size="lg" />
    </div>
  )
}

export default NotificationSetting
