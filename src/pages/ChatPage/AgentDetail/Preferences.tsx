import {
  BellRingingIcon,
  BrandWechatIcon,
  VoiceAccentIcon,
  VoiceChatIcon,
  WorldIcon,
} from "@components/Icons/AgentDetailIcon"
import { Switch } from "@nextui-org/react"
import { FieldLabel } from "./CategoryLabel"

const TWITTER_FEATURE = [
  {
    label: "Insight Notifications",
    icon: <BellRingingIcon />,
    enabled: true,
  },
  {
    label: "Suggest Replies",
    icon: <BrandWechatIcon />,
    enabled: false,
  },
  {
    label: "Default language",
    icon: <WorldIcon />,
    enabled: false,
  },
  {
    label: "Voice Chat",
    icon: <VoiceChatIcon />,
    enabled: false,
  },
  {
    label: "Voice Accent",
    icon: <VoiceAccentIcon />,
    enabled: false,
  },
]

const Preferences: React.FC = () => {
  const renderFeature = () => {
    return (
      <div className="flex w-full flex-wrap gap-5">
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
      <FieldLabel text="Preferences" />
      {renderFeature()}
    </div>
  )
}
export default Preferences
