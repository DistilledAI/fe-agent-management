import { scaler } from "@assets/images"
import { ClipboardTextIcon } from "@components/Icons/ClipboardTextIcon"
import { CheckFilledIcon } from "@components/Icons/DefiLens"
import { StarUserIconOutline } from "@components/Icons/UserIcon"
import { Textarea } from "@nextui-org/react"
import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import CategoryLabel, { FieldLabel } from "./CategoryLabel"

interface BehaviorsProps {
  isBasicVersion?: boolean
}

const LIST_PERSONALITY = [
  {
    label: "😊 Friendly",
    icon: "",
    selected: false,
    key: "Friendly",
  },
  {
    label: "💼 Professional",
    icon: "",
    selected: false,
    key: "Professional",
  },
  {
    label: "🤡 Humorous",
    icon: "",
    selected: false,
    key: "Humorous",
  },
  {
    label: "🛟 Supportive",
    icon: "",
    selected: false,
    key: "Supportive",
  },
  {
    label: "🥰 Empathetic",
    icon: "",
    selected: false,
    key: "Empathetic",
  },
  {
    label: "🤓 Informative",
    icon: "",
    selected: false,
    key: "Informative",
  },
  {
    label: "🤠 Adventurous",
    icon: "",
    selected: false,
    key: "Adventurous",
  },
  {
    label: "⭐️ Custom",
    icon: "",
    selected: false,
    key: "Custom",
  },
]

const COMMUNICATION_STYLE = [
  {
    label: "👔 Formal",
    icon: "",
    selected: false,
    key: "Formal",
  },
  {
    label: "🧢 Casual",
    icon: "",
    selected: false,
    key: "Casual",
  },
  {
    label: "🔥 Enthusiastic",
    icon: "",
    selected: false,
    key: "Enthusiastic",
  },
  {
    label: "🍃 Calm",
    icon: "",
    selected: false,
    key: "Calm",
  },
  {
    label: "👀 Direct",
    icon: "",
    selected: false,
    key: "Direct",
  },
  {
    label: "📝 Storytelling",
    icon: "",
    selected: false,
    key: "Storytelling",
  },
  {
    label: "⭐️ Custom",
    icon: "",
    selected: false,
    key: "Custom",
  },
]

const Behaviors: React.FC<BehaviorsProps> = ({ isBasicVersion }) => {
  const { control } = useFormContext()
  const [personalityValue, setPersonalityValue] = useState<string>()

  const onSelectPersonality = (value: string) => {
    setPersonalityValue(value)
  }

  if (isBasicVersion) {
    return (
      <div>
        <CategoryLabel
          text="Agent Behaviors"
          icon={<StarUserIconOutline color="#A2845E" />}
        />
        <div className="my-4">
          <FieldLabel
            text={
              <div className="mb-2 flex flex-col">
                <span className="text-base-sb text-mercury-950">
                  Your Agent’s Personality
                </span>
              </div>
            }
          />

          <div className="flex flex-wrap gap-2">
            {LIST_PERSONALITY.map((item) => {
              const isSelected = personalityValue === item.label
              return (
                <div
                  className="text-base-mb flex cursor-pointer items-center gap-2 rounded-[14px] border-[2px] border-white bg-mercury-30 p-4 text-mercury-900 aria-selected:border-brown-10 aria-selected:font-bold"
                  aria-selected={isSelected}
                  onClick={() => onSelectPersonality(item.label)}
                >
                  {item.label}
                  {isSelected && <CheckFilledIcon color="#A2845E" />}
                </div>
              )
            })}
          </div>

          <div className="mb-4 mt-6 flex flex-col">
            <span className="text-base-sb text-mercury-950">
              Communication Style
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {COMMUNICATION_STYLE.map((item) => {
              const isSelected = personalityValue === item.label
              return (
                <div
                  className="text-base-mb flex cursor-pointer items-center gap-2 rounded-[14px] border-[2px] border-white bg-mercury-30 p-4 text-mercury-900 aria-selected:border-brown-10 aria-selected:font-bold"
                  aria-selected={isSelected}
                  onClick={() => onSelectPersonality(item.label)}
                >
                  {item.label}
                  {isSelected && <CheckFilledIcon color="#A2845E" />}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <CategoryLabel text="Agent Behaviors" icon={<ClipboardTextIcon />} />
      <div className="my-4">
        <FieldLabel text="Greeting message" />

        <Controller
          name="firstMsg"
          control={control}
          render={({ field: { value, onChange } }: any) => {
            return (
              <Textarea
                placeholder="An agent’s opening message in a new context."
                className="w-full rounded-xl border border-mercury-400"
                classNames={{
                  inputWrapper: "bg-mercury-70",
                }}
                minRows={5}
                maxRows={5}
                onChange={(e) => onChange(e.target.value)}
                value={value}
              />
            )
          }}
        />
      </div>

      <div className="flex w-full justify-between gap-6">
        <div className="w-[65%]">
          <FieldLabel text="Prompt" required />
          <Textarea
            placeholder="Instruct your agent on how to act and respond to messages from users."
            className="w-full rounded-xl border border-mercury-400"
            classNames={{
              inputWrapper: "bg-mercury-70",
            }}
            minRows={7}
            maxRows={7}
          />
        </div>
        <div className="w-[35%]">
          <div className="flex justify-between">
            <FieldLabel text="Mood" />
            <span className="text-base-sb text-[#4F705B]">
              Positive, Energetic
            </span>
          </div>
          <img
            className="m-auto h-auto w-[250px] object-cover p-4"
            src={scaler}
            alt="agent creative"
          />
        </div>
      </div>
    </div>
  )
}
export default Behaviors
