import { scaler } from "@assets/images"
import { ClipboardTextIcon } from "@components/Icons/ClipboardTextIcon"
import { CheckFilledIcon } from "@components/Icons/DefiLens"
import { StarUserIconOutline } from "@components/Icons/UserIcon"
import { Textarea } from "@nextui-org/react"
import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import CategoryLabel, { FieldLabel } from "./CategoryLabel"
import { COMMUNICATION_STYLE_LIST, PERSONALITY_LIST } from "@constants/index"

interface BehaviorsProps {
  isBasicVersion?: boolean
}

const Behaviors: React.FC<BehaviorsProps> = ({ isBasicVersion }) => {
  const { control } = useFormContext()
  const [personalityValue, setPersonalityValue] = useState<string>()

  const onSelectPersonality = (value: string) => {
    setPersonalityValue(value)
  }

  if (isBasicVersion) {
    return (
      <div className="space-y-6">
        <CategoryLabel
          text="Agent Behaviors"
          icon={<StarUserIconOutline color="#A2845E" />}
        />
        <div>
          <FieldLabel
            text="Your Agent’s Personality"
            desc="Choose up to three traits that best describe your agent's personality."
            containerClassName="mb-4"
          />

          <div className="flex flex-wrap gap-2">
            {PERSONALITY_LIST.map((item) => {
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

        <div>
          <FieldLabel
            text="Communication Style"
            desc="Select the tone and style your agent should use when communicating."
            containerClassName="mb-4"
          />

          <div className="flex flex-wrap gap-2">
            {COMMUNICATION_STYLE_LIST.map((item) => {
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
