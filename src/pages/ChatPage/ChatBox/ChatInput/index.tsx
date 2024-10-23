import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import { PaperClipFilledIcon } from "@components/Icons/PaperClip"
import { RoleUser } from "@constants/index"
import { Button, Textarea } from "@nextui-org/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { makeId } from "@utils/index"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"
import { postChatToGroup } from "services/chat"
import { twMerge } from "tailwind-merge"
import { IMessageBox, RoleChat } from "../ChatMessages/helpers"
import { useStyleBoxChat } from "../StyleProvider"
import VoiceChat from "./Voice"
import { messagesQueryKey } from "../ChatMessages/useFetchMessages"
import { QueryDataKeys } from "types/queryDataKeys"

interface ChatInputProps {
  isDisabledInput: boolean
  wrapperClassName?: string
}

const ChatInput = ({ isDisabledInput, wrapperClassName }: ChatInputProps) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition()
  const { chatId, privateChatId } = useParams()
  const [isFocus, setIsFocus] = useState(false)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const heightBoxRef = useRef(0)
  const { setStyle } = useStyleBoxChat()
  const queryClient = useQueryClient()

  const groupId = chatId ?? privateChatId

  const mutation = useMutation({
    mutationKey: [QueryDataKeys.SEND_MESSAGE],
    mutationFn: (message: string) =>
      postChatToGroup({
        groupId: Number(groupId),
        messages: message,
      }),
    onMutate(variables) {
      const newMessage = {
        content: variables,
        role: RoleChat.OWNER,
        id: makeId(),
        roleOwner: RoleUser.USER,
        createdAt: new Date().toISOString(),
      }

      queryClient.setQueryData(
        messagesQueryKey(groupId),
        (cachedData: IMessageBox[]) => {
          if (cachedData === undefined) return [newMessage]
          return [...cachedData, newMessage]
        },
      )

      return { newMessage }
    },
    onSuccess: (_, __, { newMessage }) => {
      queryClient.setQueryData(
        messagesQueryKey(groupId),
        (cachedData: IMessageBox[]) => {
          if (cachedData === undefined || cachedData === null)
            return [newMessage]
          return cachedData.map((message) => {
            if (message.id === newMessage.id) return newMessage
            return message
          })
        },
      )
      SpeechRecognition.stopListening()
    },
    onError: (error) => {
      console.error("Failed to send message", error)
    },
  })

  const onSubmit = async () => {
    if (!message) return

    setMessage("")
    mutation.mutate(message)
  }

  const handleKeyDown = (e: any) => {
    const isSubmit = e.key === "Enter" && !e.shiftKey
    if (isSubmit) {
      e.preventDefault()
      //handle vi key double submit
      if (!isSubmitting) {
        setIsSubmitting(true)
        onSubmit()

        setTimeout(() => {
          setIsSubmitting(false)
          setMessage("")
          SpeechRecognition.stopListening()
        }, 1)
      }
    }
  }

  const handleCheckHeight = () => {
    const height = boxRef.current?.clientHeight
    if (!height) return
    setStyle({
      paddingBottom:
        height === heightBoxRef.current ? 12 : height - heightBoxRef.current,
    })
  }

  useEffect(() => {
    const height = boxRef.current?.clientHeight
    if (height) heightBoxRef.current = height
  }, [])

  return (
    <div
      ref={boxRef}
      className={twMerge(
        "absolute bottom-6 left-1/2 z-[11] flex w-full max-w-[768px] -translate-x-1/2 items-center gap-4 rounded-[35px] border-1 bg-mercury-200 p-2 py-1 duration-500 max-sm:static max-sm:gap-2 sm:p-3 sm:py-[7.89px]",
        isFocus ? "border-mercury-300" : "border-mercury-200",
        wrapperClassName,
      )}
    >
      <Button
        isDisabled
        className="h-9 w-[52px] min-w-[52px] rounded-full border border-white bg-mercury-30 px-4 py-2"
      >
        <PaperClipFilledIcon />
      </Button>
      <Textarea
        placeholder="Type your message"
        classNames={{
          inputWrapper:
            "bg-mercury-200 border-none focus-within:!bg-mercury-200 hover:!bg-mercury-200 shadow-none px-0",
          input:
            "text-[18px] text-mercury-900 placeholder:text-mercury-700 font-barlow",
        }}
        onKeyDown={handleKeyDown}
        minRows={1}
        maxRows={4}
        onKeyUp={handleCheckHeight}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onValueChange={setMessage}
        value={message}
        isDisabled={isDisabledInput}
      />
      <VoiceChat
        resetTranscript={resetTranscript}
        isListening={listening}
        SpeechRecognition={SpeechRecognition}
        transcript={transcript}
        setMessages={setMessage}
        isDisabled={isDisabledInput}
      />
      <Button
        onClick={onSubmit}
        isDisabled={!message || mutation.isPending}
        type="submit"
        isIconOnly
        className="h-9 w-[52px] min-w-[52px] rounded-full border border-mercury-900 bg-mercury-950 px-4 py-2"
      >
        <ArrowUpFilledIcon />
      </Button>
    </div>
  )
}

export default ChatInput
