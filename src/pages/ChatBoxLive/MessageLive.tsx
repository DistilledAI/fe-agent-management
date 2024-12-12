import AvatarCustom from "@components/AvatarCustom"
import EmojiReactions, { EmojiReactionItem } from "@components/EmojiReactions"
import { ImageIcon } from "@components/Icons"
import { ArrowsRelyIcon } from "@components/Icons/Arrow"
import MarkdownMessage from "@components/Markdown"
import { RoleUser } from "@constants/index"
import useAuthState from "@hooks/useAuthState"
import { EMOJI_REACTIONS } from "@pages/AgentDetail/AgentBehaviors/constants"
import { IMessageBox } from "@pages/ChatPage/ChatBox/ChatMessages/helpers"
import { IReactionMsgStats } from "@pages/ChatPage/ChatBox/ChatMessages/useFetchMessages"
import { isMarkdownImage } from "@utils/index"
import { useState } from "react"
import { postReactionMsg } from "services/messages"
import { twMerge } from "tailwind-merge"
import { ReactionTypes } from "types/reactions"

interface MessageLiveProps {
  message: IMessageBox
  onReply: () => void
  groupId: string
}

const formatUsername = (username: string) => {
  return username.replace(/@\[(\w+)\]/g, "@$1")
}

const MessageLive: React.FC<MessageLiveProps> = ({
  message,
  onReply,
  groupId,
}) => {
  const isBot = message?.roleOwner === RoleUser.BOT
  const { user } = useAuthState()
  const isOwner = user.id === message?.userId
  const [emojiReactions, setEmojiReactions] = useState<IReactionMsgStats[]>(
    () => message?.reactionMsgStats || [],
  )

  const handleEmojiReaction = async (
    item: EmojiReactionItem | IReactionMsgStats,
  ) => {
    const existingReaction = emojiReactions.find(
      (val) => val.reactionType === item.reactionType,
    )

    let updatedReactions

    if (existingReaction) {
      // Toggle reaction
      if (existingReaction.isReacted) {
        updatedReactions = emojiReactions.map((val) =>
          val.reactionType === item.reactionType
            ? { ...val, total: val.total - 1, isReacted: false }
            : val,
        )
      } else {
        updatedReactions = emojiReactions.map((val) =>
          val.reactionType === item.reactionType
            ? { ...val, total: val.total + 1, isReacted: true }
            : val,
        )
      }
    } else {
      // Add new reaction
      updatedReactions = [
        ...emojiReactions,
        {
          msgId: message.id,
          reactionType: item.reactionType,
          total: 1,
          isReacted: true,
        },
      ]
    }

    setEmojiReactions(updatedReactions)

    // Call API
    await postReactionMsg({
      msgId: message.id,
      groupId,
      reactionType: item.reactionType,
    })
  }

  return (
    <div className="group/item relative flex gap-3 md:gap-4">
      <div className="absolute -bottom-2 -left-4 -top-2 right-0 hidden rounded-[8px] bg-mercury-70 transition-all duration-100 ease-linear group-hover/item:block">
        <div className="absolute -top-4 right-3 flex items-center gap-2">
          <EmojiReactions onEmojiReaction={handleEmojiReaction} />
          {!isOwner && (
            <button
              type="button"
              onClick={onReply}
              className="flex h-8 items-center gap-1 rounded-full border border-mercury-200 bg-white px-3 py-1 !opacity-100 duration-100 hover:scale-105"
            >
              <ArrowsRelyIcon />
              <span className="">Reply</span>
            </button>
          )}
        </div>
      </div>
      <div className="relative">
        <AvatarCustom
          src={message?.avatar}
          publicAddress={message?.publicAddress}
        />
      </div>
      <div className="relative flex flex-col">
        <div className="flex items-center gap-2">
          <p
            className={twMerge(
              "line-clamp-1 max-w-[220px]",
              isBot
                ? "bg-lgd-code-hot-ramp bg-clip-text text-base font-bold text-transparent"
                : "text-base-b",
            )}
          >
            {message?.username}
          </p>
          {message.reply && (
            <div className="flex items-center gap-2">
              <p className="line-clamp-1 max-w-[120px] text-15 font-semibold text-brown-500">
                {formatUsername(message.reply.username)}
              </p>
              <p className="line-clamp-1 max-w-[200px] text-15 text-mercury-400">
                {isMarkdownImage(message.reply.message) ? (
                  <ImageIcon color="#ADADAD" />
                ) : (
                  message.reply.message
                )}
              </p>
            </div>
          )}
        </div>
        <div
          className="text-base text-mercury-900 aria-selected:italic"
          aria-selected={isBot}
        >
          <MarkdownMessage msg={message?.content} />
          <div className="flex items-center gap-2">
            {emojiReactions.map((item, index) => {
              const emoji = EMOJI_REACTIONS.find(
                (val) =>
                  val.reactionType === (item.reactionType as ReactionTypes),
              )?.emoji

              return (
                <div
                  className={twMerge(
                    "flex h-8 min-w-[50px] cursor-pointer items-center gap-1 rounded-full border border-mercury-200 bg-white px-3 py-1 transition-all duration-300 ease-in-out",
                    item?.isReacted && "border-brown-500 bg-brown-50",
                  )}
                  key={`${item.msgId}-${index}`}
                  onClick={() => handleEmojiReaction(item)}
                >
                  <span
                    className={twMerge(
                      "text-[16px] font-medium text-mercury-500",
                      item?.isReacted && "text-mercury-800",
                    )}
                  >
                    {item.total}
                  </span>
                  {emoji}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageLive
