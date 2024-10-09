import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import { MicrophoneFilledIcon } from "@components/Icons/Microphone"
import { PaperClipFilledIcon } from "@components/Icons/PaperClip"
import { Button, Textarea } from "@nextui-org/react"
import { useChatMessage } from "providers/MessageProvider"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { postChatToGroup } from "services/chat"
import { RoleChat } from "./ChatMessages/helpers"
import { makeId } from "@utils/index"
import { useStyleBoxChat } from "./StyleProvider"

const ChatInput = () => {
  const { setMessages: setMessageContext } = useChatMessage()
  const { chatId } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [messages, setMessages] = useState("")
  const boxRef = useRef<HTMLDivElement>(null)
  const heightBoxRef = useRef(0)
  const { setStyle } = useStyleBoxChat()

  const onSubmit = async () => {
    if (!messages) return
    setMessageContext((prev) => [
      ...prev,
      { content: messages, role: RoleChat.OWNER, id: makeId() },
    ])
    setMessages("")
    await postChatToGroup({
      groupId: Number(chatId),
      messages,
    })
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!isSubmitting) {
        setIsSubmitting(true)
        onSubmit()

        setTimeout(() => {
          setIsSubmitting(false)
          setMessages("")
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
      className="absolute -bottom-[82px] left-0 z-[11] flex w-full items-center gap-4 rounded-[35px] bg-mercury-200 p-3 duration-500"
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
            "text-[18px] text-mercury-900 placeholder:text-mercury-700  font-barlow",
        }}
        onKeyDown={handleKeyDown}
        minRows={1}
        maxRows={4}
        onKeyUp={handleCheckHeight}
        onValueChange={setMessages}
        value={messages}
      />
      <Button isDisabled isIconOnly className="rounded-full bg-mercury-200">
        <MicrophoneFilledIcon />
      </Button>
      <Button
        onClick={onSubmit}
        isDisabled={!messages}
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
