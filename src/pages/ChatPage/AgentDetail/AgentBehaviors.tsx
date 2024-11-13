import React from "react"
import { CheckFilledIcon } from "@components/Icons/DefiLens"
import CategoryLabel, { FieldLabel } from "./CategoryLabel"
import { StarUserIconOutline } from "@components/Icons/UserIcon"
import { COMMUNICATION_STYLE_LIST, PERSONALITY_LIST } from "@constants/index"
import { twMerge } from "tailwind-merge"

interface BehaviorItem {
  value: string
  label: string
}

export interface SelectedBehaviors {
  agentPersonal: string[]
  agentCommunication: string[]
}

interface AgentBehaviorsProps {
  selectedBehaviors: SelectedBehaviors
  onSelectBehaviors: (selected: SelectedBehaviors) => void
}

const AgentBehaviors: React.FC<AgentBehaviorsProps> = ({
  selectedBehaviors,
  onSelectBehaviors,
}) => {
  const handleSelect = (type: keyof SelectedBehaviors, item: string) => {
    const isAlreadySelected = selectedBehaviors[type].includes(item)
    const updatedSelection = isAlreadySelected ? [] : [item]

    onSelectBehaviors({
      ...selectedBehaviors,
      [type]: updatedSelection,
    })
  }

  const renderBehaviorItem = (
    item: BehaviorItem,
    type: keyof SelectedBehaviors,
  ) => {
    const isSelected = selectedBehaviors[type].includes(item.value)

    return (
      <div
        key={item.value}
        onClick={() => handleSelect(type, item.value)}
        className={twMerge(
          "flex cursor-pointer items-center gap-2 rounded-[14px] border-[2px] border-white bg-mercury-30 p-4 text-mercury-900 transition-all duration-300 ease-in-out",
          isSelected && "bg-brown-50 border-brown-500",
        )}
      >
        <span
          className={twMerge(
            "relative left-4 text-[16px] font-medium transition-all duration-300 ease-in-out",
            isSelected && "left-0",
          )}
        >
          {item.label}
        </span>
        <div
          className={twMerge(
            "opacity-0 transition-all duration-100 ease-in-out",
            isSelected && "opacity-100",
          )}
        >
          <CheckFilledIcon color="#A2845E" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <CategoryLabel
        text="Agent Behaviors"
        icon={<StarUserIconOutline color="#A2845E" />}
      />

      {/* Personalities */}
      <div>
        <FieldLabel
          text="Your Agent’s Personality"
          desc="Choose one trait that best describes your agent's personality."
          containerClassName="mb-4"
        />

        <div className="flex flex-wrap gap-2">
          {PERSONALITY_LIST.map((item: BehaviorItem) =>
            renderBehaviorItem(item, "agentPersonal"),
          )}
        </div>
      </div>

      {/* Communication Styles */}
      <div>
        <FieldLabel
          text="Communication Style"
          desc="Select one tone and style your agent should use when communicating."
          containerClassName="mb-4"
        />

        <div className="flex flex-wrap gap-2">
          {COMMUNICATION_STYLE_LIST.map((item: BehaviorItem) =>
            renderBehaviorItem(item, "agentCommunication"),
          )}
        </div>
      </div>
    </div>
  )
}

export default AgentBehaviors
