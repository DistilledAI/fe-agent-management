import {
  BellRingingIcon,
  BrandWechatIcon,
  VoiceAccentIcon,
  VoiceChatIcon,
  WorldIcon,
} from "@components/Icons/AgentDetailIcon"
import { Button, Select, SelectItem, Switch } from "@nextui-org/react"
import { FieldLabel } from "./CategoryLabel"
import { match } from "ts-pattern"

enum TypeAction {
  Switch = "switch",
  Select = "select",
}

enum KeyReferences {
  Notification = "notification",
  SuggestReply = "suggest_reply",
  Language = "language",
  VoiceChat = "voice_chat",
  VoiceAgent = "voice_agent",
}

const REFERENCES = [
  {
    key: KeyReferences.Notification,
    label: "Insight Notifications",
    icon: <BellRingingIcon />,
    typeAction: TypeAction.Switch,
  },
  {
    key: KeyReferences.SuggestReply,
    label: "Suggest Replies",
    icon: <BrandWechatIcon />,
    typeAction: TypeAction.Switch,
  },
  {
    key: KeyReferences.Language,
    label: "Default language",
    icon: <WorldIcon />,
    typeAction: TypeAction.Select,
  },
  {
    key: KeyReferences.VoiceChat,
    label: "Voice Chat",
    icon: <VoiceChatIcon />,
    typeAction: TypeAction.Switch,
  },
  {
    key: KeyReferences.VoiceAgent,
    label: "Voice Accent",
    icon: <VoiceAccentIcon />,
    typeAction: TypeAction.Select,
  },
]

const Preferences: React.FC = () => {
  const renderAction = (typeAction: TypeAction, key: KeyReferences) => {
    return match([typeAction, key])
      .with([TypeAction.Select, KeyReferences.Language], () => (
        <Select
          aria-label="Select Language"
          placeholder="Select language"
          className="w-full"
          classNames={{
            trigger: "rounded-full !bg-mercury-100",
          }}
          defaultSelectedKeys={["english"]}
          disableSelectorIconRotation
          selectionMode="single"
        >
          <SelectItem key={"english"}>English</SelectItem>
        </Select>
      ))
      .with([TypeAction.Select, KeyReferences.VoiceAgent], () => (
        <Select
          aria-label="Select Voice"
          placeholder="Select Voice"
          className="w-full"
          classNames={{
            trigger: "rounded-full !bg-mercury-100",
          }}
          defaultSelectedKeys={["natasha"]}
          disableSelectorIconRotation
          selectionMode="single"
        >
          <SelectItem key={"natasha"}>Natasha</SelectItem>
        </Select>
      ))
      .otherwise(() => <Switch aria-label="Automatic updates" />)
  }

  const renderFeature = () => {
    return (
      <div className="pointer-events-none flex w-full flex-wrap gap-5 opacity-50">
        {REFERENCES.map((item) => {
          return (
            <div className="min-w-[240px] rounded-[22px] bg-mercury-30 p-4 max-sm:w-full">
              <div className="mb-4 flex items-center gap-2">
                {item.icon}
                <span className="text-base-md max-sm:text-15">
                  {item.label}
                </span>
              </div>
              {renderAction(item.typeAction, item.key)}
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
          <div className="flex flex-wrap items-center gap-2">
            <span>Preferences</span>
            <Button className="text-base-14 h-auto rounded-full bg-mercury-800 py-[2px] font-bold text-mercury-30 max-sm:text-12">
              COMING SOON
            </Button>
          </div>
        }
      />
      {renderFeature()}
    </div>
  )
}
export default Preferences
