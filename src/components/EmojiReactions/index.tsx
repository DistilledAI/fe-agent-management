import { MoodSmileIcon } from "@components/Icons/Emoji"
import { useDisclosure } from "@nextui-org/react"
import { EMOJI_REACTIONS } from "@pages/AgentDetail/AgentBehaviors/constants"
import { twMerge } from "tailwind-merge"
import { ReactionType } from "types/reactions"

export interface EmojiReactionItem {
  reactionType: ReactionType
  emoji: string
}

interface EmojiReactionsProps {
  onEmojiReaction: (emojiReactionItem: EmojiReactionItem) => void
}

const EmojiReactions = ({ onEmojiReaction }: EmojiReactionsProps) => {
  const { isOpen, onOpenChange, onClose } = useDisclosure()

  return (
    <div
      className="flex items-center gap-2"
      onMouseEnter={onClose}
      onMouseLeave={onClose}
    >
      <div
        className={twMerge(
          "hidden h-8 items-center gap-3 rounded-full border border-mercury-200 bg-white px-3 py-1",
          isOpen && "flex",
        )}
      >
        {EMOJI_REACTIONS.map((item: any) => (
          <button
            type="button"
            key={item.reactionType}
            onClick={() => {
              onEmojiReaction(item)
              onClose()
            }}
          >
            {item.emoji}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onOpenChange}
        className={twMerge(
          "flex h-8 items-center gap-1 rounded-full border border-mercury-200 bg-white px-3 py-1 !opacity-100 duration-300 hover:scale-105",
          isOpen && "border-mercury-300 bg-mercury-100",
        )}
      >
        <MoodSmileIcon />
      </button>
    </div>
  )
}

export default EmojiReactions
