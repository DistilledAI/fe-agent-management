import {
  PencilBoltIcon,
  PhototBoltIcon,
  RepeatIcon,
} from "@components/Icons/AgentDetailIcon"
import { TwitterIcon } from "@components/Icons/Twitter"
import { Button, Switch } from "@nextui-org/react"
import { FieldLabel } from "./CategoryLabel"

const TWITTER_FEATURE = [
  {
    label: "Auto-Post",
    icon: <PencilBoltIcon />,
    enabled: true,
  },
  {
    label: "Auto-post Image",
    icon: <PhototBoltIcon />,
    enabled: false,
  },
  {
    label: "Auto-Repost",
    icon: <RepeatIcon />,
    enabled: false,
  },
]

const AIAgentGenerate: React.FC = () => {
  const renderFeature = () => {
    return (
      <div className="flex w-full flex-wrap justify-between gap-5">
        {TWITTER_FEATURE.map((item) => {
          return (
            <div className="min-w-[240px] rounded-[22px] bg-mercury-30 p-4">
              <div className="mb-4 flex items-center gap-2">
                {item.icon}
                <span className="text-base-md">{item.label}</span>
              </div>
              <Switch
                isSelected={item.enabled}
                aria-label="Automatic updates"
              />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="my-6">
      <FieldLabel
        text={
          <div className="flex items-center gap-2">
            <TwitterIcon />
            <span>Automate Posting on Twitter</span>
            <Button className="text-base-14 h-auto rounded-full bg-brown-10 py-[2px] font-bold text-mercury-30">
              AI AGENT GENERATE
            </Button>
          </div>
        }
      />
      {renderFeature()}
    </div>
  )
}
export default AIAgentGenerate
