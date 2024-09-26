import { checkIconColor } from "@assets/svg"
import {
  IconGaveFeedback,
  IconLiked,
  IconNoneFeedback,
  IconUnLiked,
} from "@components/Icons/DefiLens"
import { useAppSelector } from "@hooks/useAppRedux"
import { getVisitorId } from "@utils/index"
import { ChatItem } from "pages/Chatbot/hooks/useChatMsg"
import { useState } from "react"
import { postFeedback } from "services/llmChatbot"

const FeedbackAction: React.FC<{ chatItem: ChatItem }> = ({ chatItem }) => {
  const [isShowFeedbackForm, setShowFeedBackForm] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [isDisLiked, setDisLiked] = useState<boolean>(false)
  const [isFeedback, setIsFeedback] = useState<boolean>(false)
  const [feedbackValue, setFeedbackValue] = useState<string>("")
  const isChatting = useAppSelector((state) => state.chatBox.isChatting)

  const toggleFeedbackForm = async () => {
    if (isFeedback) return
    if (!!isLiked) setIsLiked(false)
    setShowFeedBackForm(!isShowFeedbackForm)
    setDisLiked(!isDisLiked)
  }

  const toggleLike = async () => {
    if(isFeedback)return;
    if (!isLiked) {
      setShowFeedBackForm(false)
      setDisLiked(false)
    }
    setIsLiked(!isLiked)
  }

  const handleSubmit = async () => {
    if (!feedbackValue) return
    const deviceId = await getVisitorId()
    try {
      const data = {
        userId: deviceId,
        chatId: chatItem?.id,
        content: feedbackValue,
        reaction_status: "bad",
      }
      const res = await postFeedback(data)
      if (res?.success) {
        setIsFeedback(true)
        setShowFeedBackForm(false)
      }
    } catch (error) {
      console.log({ error })
    }
  }

  const handleOnChangeValue = (value: string) => {
    setFeedbackValue(value)
  }

  if (isChatting) return <div />

  return (
    <div>
      <div className="my-3 flex gap-4">
        <button onClick={() => toggleLike()} type="button">
          {isLiked ? <IconLiked /> : <IconUnLiked />}
        </button>
        <button onClick={() => toggleFeedbackForm()} type="button">
          {isDisLiked ? <IconGaveFeedback /> : <IconNoneFeedback />}
        </button>
      </div>

      {isFeedback && (
        <div className="flex gap-2">
          <img src={checkIconColor} />
          <div>
            <div className="text-14 font-[600]">Thanks for your feedback!</div>
          </div>
        </div>
      )}

      {isShowFeedbackForm && (
        <div className="relative">
          <input
            id="input-msg"
            type="text"
            className="focus-within:none h-12 w-[318px] appearance-none rounded-2xl bg-transparent bg-white py-3 pl-4 pr-20 text-14 shadow-1 placeholder:text-gray-60 focus-visible:outline-none dark:bg-[#161715]"
            placeholder="Write your feedback..."
            autoComplete="off"
            onChange={(e) => handleOnChangeValue(e.target.value)}
            autoFocus={true}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit()
            }}
          />
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="absolute right-2 top-1/2 flex h-8 w-[58px] -translate-y-1/2 items-center justify-center rounded-full bg-neutral-title px-3 py-1 text-14 font-semibold text-[#FBFBFB]"
          >
            Send
          </button>
        </div>
      )}
    </div>
  )
}
export default FeedbackAction
