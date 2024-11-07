import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import { PaperClipFilledIcon } from "@components/Icons/PaperClip"
import { Button, Textarea } from "@nextui-org/react"
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

  useEffect(() => {
    if (!isMobile) inputRef.current.focus()
  }, [pathname, isMobile])

  const groupId = chatId || privateChatId

  const handleSubmit = async () => {
    if (!message) return

    setMessage("")
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
      <Button
        isDisabled
        className={twMerge(
          "h-9 w-[52px] min-w-[52px] rounded-full border border-white bg-mercury-30 px-4 py-2",
          isDarkTheme && "bg-mercury-30",
        )}
      >
        <PaperClipFilledIcon
          color={isDarkTheme ? "rgba(84, 84, 84, 1)" : "#545454"}
        />
      </Button>
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
      <Button
        onClick={handleSubmit}
        isDisabled={!message || isPending}
        type="submit"
        isIconOnly
        className={twMerge(
          "h-9 w-[52px] min-w-[52px] rounded-full border border-mercury-900 bg-mercury-950 px-4 py-2",
          isDarkTheme && "bg-white",
        )}
      >
        <ArrowUpFilledIcon bgColor={isDarkTheme ? "#363636" : "#FAFAFA"} />
      </Button>
    </div>
  )
}

export default ChatInput
