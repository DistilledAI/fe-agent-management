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
import { QueryDataKeys } from "types/queryDataKeys"
import { RoleChat } from "../ChatMessages/helpers"
import {
  ICachedMessageData,
  messagesQueryKey,
} from "../ChatMessages/useFetchMessages"
import { useStyleBoxChat } from "../StyleProvider"
import VoiceChat from "./Voice"

interface ChatInputProps {
  isDisabledInput: boolean
  wrapperClassName?: string
  isDarkTheme?: boolean
}

const ChatInput = ({
  isDisabledInput,
  wrapperClassName,
  isDarkTheme,
}: ChatInputProps) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition()
  const { chatId, privateChatId } = useParams()
  const [isFocus, setIsFocus] = useState(false)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const heightBoxRef = useRef(0)
  const { setStyle } = useStyleBoxChat()
  const queryClient = useQueryClient()

  const groupId = privateChatId || chatId

  const mutation = useMutation({
    mutationKey: [QueryDataKeys.SEND_MESSAGE],
    mutationFn: (message: string) =>
      postChatToGroup({
        groupId: Number(groupId),
        messages: message,
      }),
    onMutate: (variables) => {
      const newMessage = {
        content: variables,
        role: RoleChat.OWNER,
        id: makeId(),
        roleOwner: RoleUser.USER,
        createdAt: new Date().toISOString(),
      }

      queryClient.setQueryData(
        messagesQueryKey(groupId),
        (cachedData: ICachedMessageData) => {
          if (!cachedData)
            return {
              pageParams: [],
              pages: [
                {
                  messages: [newMessage],
                  nextOffset: 0,
                },
              ],
            }

          const lastPage = cachedData.pages[cachedData.pages.length - 1]

          return {
            ...cachedData,
            pages: [
              ...cachedData.pages.slice(0, -1),
              {
                ...lastPage,
                messages: [...lastPage.messages, newMessage],
              },
            ],
          }
        },
      )

      return { newMessage }
    },
    //   queryClient.setQueryData<InfiniteData<IMessageBox[]>>(
    //     messagesQueryKey(groupId),
    //     (cachedData) => {
    //       if (!cachedData) return { pageParams: [], pages: [[newMessage]] }

    //       console.log({ cachedData })

    //       return {
    //         ...cachedData,
    //         pages: cachedData.pages.map((page, index) =>
    //           index === cachedData.pages.length - 1
    //             ? page.map((message) =>
    //                 message.id === newMessage.id ? newMessage : message,
    //               )
    //             : page,
    //         ),
    //       }
    //     },
    //   )
    //   SpeechRecognition.stopListening()
    // },
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
        height === heightBoxRef.current ? 0 : height - heightBoxRef.current,
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
        "absolute bottom-4 z-[11] flex max-w-[768px] items-center gap-4 rounded-[35px] border-1 bg-mercury-200 p-2 py-1 duration-500 max-sm:static max-sm:gap-2 sm:p-3 sm:py-[7.89px] md:bottom-8",
        isFocus ? "border-mercury-300" : "border-mercury-200",
        wrapperClassName,
        isDarkTheme && "bg-mercury-950",
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
            "bg-mercury-200 border-none focus-within:!bg-mercury-200 hover:!bg-mercury-200 shadow-none px-0",
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
        onClick={onSubmit}
        isDisabled={!message || mutation.isPending}
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
