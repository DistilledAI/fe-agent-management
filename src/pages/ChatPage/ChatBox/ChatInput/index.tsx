import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import { PaperClipFilledIcon } from "@components/Icons/PaperClip"
import { Textarea } from "@nextui-org/react"
import useGetChatId from "@pages/ChatPage/Mobile/ChatDetail/useGetChatId"
import { useStyleSpacing } from "providers/StyleSpacingProvider"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"
import { twMerge } from "tailwind-merge"
import VoiceChat from "./Voice"
import useWindowSize from "@hooks/useWindowSize"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"
import { BOT_STATUS } from "../ChatMessages/ChatActions/DelegatePrivateAgent"
import useAuthState from "@hooks/useAuthState"

interface ChatInputProps {
  isDisabledInput: boolean
  onSubmit: (value: string) => void
  isPending: boolean
  wrapperClassName?: string
  isDarkTheme?: boolean
}

const ChatInput = ({
  isDisabledInput,
  onSubmit,
  wrapperClassName,
  isDarkTheme,
  isPending,
}: ChatInputProps) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition()
  const [isFocus, setIsFocus] = useState(false)
  const [message, setMessage] = useState("")
  const { pathname } = useLocation()
  const { isMobile } = useWindowSize()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const heightBoxRef = useRef(0)
  const { setSpacing, spacing } = useStyleSpacing()
  const { privateChatId } = useParams()
  const { chatId } = useGetChatId()
  const inputRef = useRef<any>(null)
  const queryClient = useQueryClient()
  const groupId = chatId || privateChatId
  const { user } = useAuthState()

  const { data: isChatting } = useQuery({
    initialData: false,
    queryKey: ["isChatting", groupId],
    enabled: !!groupId,
  })
  const { data: botInfo } = useQuery<any>({
    queryKey: [QueryDataKeys.DELEGATE_PRIVATE_AGENT, groupId],
    enabled: !!groupId,
  })

  const isBotEnabled = botInfo?.status === BOT_STATUS.ENABLE

  useEffect(() => {
    if (!isMobile) {
      inputRef.current.focus()
    }
  }, [pathname, isMobile, isChatting])

  const handleSubmit = async () => {
    if (!message) return

    setMessage("")
    queryClient.setQueryData(
      ["isChatting", groupId, user?.id.toString()],
      () => (botInfo?.myBot ? isBotEnabled : true),
    )
    onSubmit(message)
  }

  const handleKeyDown = (e: any) => {
    const isSubmit = e.key === "Enter" && !e.shiftKey
    if (isSubmit) {
      e.preventDefault()
      //handle vi key double submit
      if (!isSubmitting) {
        setIsSubmitting(true)
        handleSubmit()

        setTimeout(() => {
          setIsSubmitting(false)
          setMessage("")
          SpeechRecognition.stopListening()
        }, 1)
      }
    }
  }

  useLayoutEffect(() => {
    if (groupId) {
      setSpacing(0)
      setMessage("")
    }
  }, [groupId])

  useEffect(() => {
    const height = boxRef.current?.clientHeight
    if (height) heightBoxRef.current = height
  }, [])

  const handleCheckHeight = () => {
    const height = boxRef.current?.clientHeight
    if (!height) return
    setSpacing(
      height === heightBoxRef.current ? 0 : height - heightBoxRef.current,
    )
  }

  return (
    <div
      ref={boxRef}
      className={twMerge(
        "absolute bottom-4 z-[11] flex max-w-[768px] items-center gap-4 rounded-[35px] border-1 bg-mercury-200 p-2 py-1 transition-all duration-300 ease-linear max-md:static max-md:gap-2 md:bottom-8 md:p-3 md:py-[7.89px]",
        isFocus ? "border-mercury-300" : "border-mercury-200",
        spacing && "items-end",
        isDarkTheme && "bg-mercury-950",
        wrapperClassName,
      )}
    >
      <button
        type="button"
        disabled
        className={twMerge(
          "h-9 w-[52px] min-w-[52px] rounded-full border border-white bg-mercury-30 px-4 py-2",
          isDarkTheme && "bg-mercury-30",
          //disabled
          "border-transparent disabled:bg-mercury-30/50",
        )}
      >
        <PaperClipFilledIcon
          color={isDarkTheme ? "rgba(84, 84, 84, 1)" : "#545454"}
        />
      </button>
      <Textarea
        placeholder="Type your message"
        classNames={{
          inputWrapper: twMerge(
            "bg-mercury-200 border-none focus-within:!bg-mercury-200 hover:!bg-mercury-200 shadow-none px-0 !ring-offset-0 !ring-transparent",
            isDarkTheme &&
              "bg-mercury-950 focus-within:!bg-mercury-950 hover:!bg-mercury-950",
          ),
          input: twMerge(
            "text-[18px] text-mercury-900 placeholder:text-mercury-700 font-barlow",
            isDarkTheme && "!text-mercury-30 placeholder:text-mercury-400",
          ),
        }}
        onKeyDown={handleKeyDown}
        minRows={1}
        maxRows={4}
        onKeyUp={handleCheckHeight}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onValueChange={setMessage}
        value={message}
        ref={inputRef}
        isDisabled={isDisabledInput}
      />
      <VoiceChat
        resetTranscript={resetTranscript}
        isListening={listening}
        SpeechRecognition={SpeechRecognition}
        transcript={transcript}
        setMessages={setMessage}
        isDisabled={isDisabledInput}
        isDarkTheme={isDarkTheme}
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isDisabledInput || !message || isPending}
        className={twMerge(
          "h-9 w-[52px] min-w-[52px] rounded-full border border-mercury-900 bg-mercury-950 px-4 py-2 disabled:border-transparent disabled:bg-mercury-950/60",
          isDarkTheme && "bg-white disabled:bg-white/60",
        )}
      >
        <ArrowUpFilledIcon bgColor={isDarkTheme ? "#363636" : "#FAFAFA"} />
      </button>
    </div>
  )
}

export default ChatInput
