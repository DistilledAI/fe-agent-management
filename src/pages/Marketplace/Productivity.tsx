import AvatarCustom from "@components/AvatarCustom"
import { MailBoltIcon } from "@components/Icons/EmailUpIcon"
import { MessageDots } from "@components/Icons/Message"
import { PencilCogIcon } from "@components/Icons/Pencil"
import { PlaneTiltIcon } from "@components/Icons/Plane"
import { Button } from "@nextui-org/react"

const PRODUCTIVITY_LIST = [
  {
    name: "Email Helper",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    icon: <MailBoltIcon />,
  },
  {
    name: "Blog Writer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    icon: <PencilCogIcon />,
  },
  {
    name: "Travel Planner",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    icon: <PlaneTiltIcon />,
  },
]

const Productivity = () => {
  return PRODUCTIVITY_LIST.map((item, index) => (
    <div
      className="flex justify-between gap-6 border-b border-b-mercury-70 py-2 last:border-none"
      key={index}
    >
      <div className="flex gap-4">
        <AvatarCustom badgeClassName="bg-yellow-10" icon={item.icon} />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base-b line-clamp-1 text-mercury-800">
              {item.name}
            </span>
          </div>
          <p className="max-w-[187px] text-13 font-medium text-mercury-600">
            {item.description || "Distilled AI Agent"}
          </p>
        </div>
      </div>
      <Button className="min-w-[52px] rounded-full border border-mercury-50 bg-mercury-100 px-4 py-2">
        <MessageDots />
      </Button>
    </div>
  ))
}

export default Productivity
