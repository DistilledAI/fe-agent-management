import { ArrowUpFilledIcon } from "@components/Icons/Arrow"
import { MicrophoneFilledIcon } from "@components/Icons/Microphone"
import { PaperClipFilledIcon } from "@components/Icons/PaperClip"
import { Button, Textarea } from "@nextui-org/react"
import { useState } from "react"
import { postChatSendToUser } from "services/chat"
import { RoleChat } from "./ChatMessages/helpers"
import { useChatMessage } from "providers/MessageProvider"
import { getToUserId } from "./helpers"
import useAuthState from "@hooks/useAuthState"

const ChatInput = () => {
  const { user } = useAuthState()
  const { setMessages: setMessageContext, dataFetch } = useChatMessage()
  const toUserId = getToUserId(dataFetch?.[0], user?.id ?? 0)
  const [messages, setMessages] = useState("")

  const onSubmit = async () => {
    if (!messages) return
    setMessages("")
    setMessageContext((prev) => [
      ...prev,
      { content: messages, role: RoleChat.OWNER },
    ])
    await postChatSendToUser({ messages, toUserId })
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className="flex items-center gap-4 rounded-full bg-mercury-200 p-3">
      <Button className="h-9 w-[52px] min-w-[52px] rounded-full border border-white bg-mercury-30 px-4 py-2">
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
        maxRows={3}
        onValueChange={setMessages}
        value={messages}
      />
      <Button isIconOnly className="rounded-full bg-mercury-200">
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
