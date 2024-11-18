import {
  PencilBoltIcon,
  PhototBoltIcon,
  RepeatIcon,
} from "@components/Icons/AgentDetailIcon"
import { TwitterIcon } from "@components/Icons/Twitter"
import { Button, Switch } from "@nextui-org/react"
import { FieldLabel } from "./CategoryLabel"
import ComingSoon from "@components/ComingSoon"
import { LinkAccountIcon } from "@components/Icons"

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
      <div className="pointer-events-none mt-5 flex w-full flex-wrap justify-between gap-5 opacity-50">
        {TWITTER_FEATURE.map((item, index) => {
          return (
            <div
              className="min-w-[240px] rounded-[22px] bg-mercury-30 p-4 max-sm:w-full"
              key={index}
            >
              <div className="mb-4 flex items-center gap-2">
                {item.icon}
                <span className="text-base-md max-sm:text-15">
                  {item.label}
                </span>
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
          <div className="flex items-center justify-between gap-3 max-sm:flex-col max-sm:items-start">
            <div className="flex flex-wrap items-center gap-2">
              <TwitterIcon />
              <span>Automate Posting on Twitter</span>
              {/* <Button className="text-base-14 h-auto rounded-full bg-brown-10 py-[2px] font-bold text-mercury-30 max-sm:text-12">
              AI AGENT GENERATE
            </Button> */}
              <Button className="text-base-14 h-auto rounded-full bg-mercury-800 py-[2px] font-bold text-mercury-30 max-sm:text-12">
                COMING SOON
              </Button>
            </div>
            <div>
              <ComingSoon>
                <div className="flex items-center gap-2">
                  <LinkAccountIcon />
                  <span className="font-medium text-[#A2845E]">
                    Link your agent account
                  </span>
                </div>
              </ComingSoon>
            </div>
          </div>
        }
      />
      {renderFeature()}
    </div>
  )
}
export default AIAgentGenerate
