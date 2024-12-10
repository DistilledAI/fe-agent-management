import React from "react"
import { twMerge } from "tailwind-merge"
import TradeTokenButton from "../TradeTokenButton"
import ChatInput from "@pages/ChatPage/ChatBox/ChatInput"
import useSubmitChat from "@hooks/useSubmitChat"
import SpeechRecognition from "react-speech-recognition"
import useAuthState from "@hooks/useAuthState"

const SendMessage: React.FC<{
  sidebarCollapsed: boolean
  isMaxi: boolean
  resetReply: () => void
  chatId: string
  replyId: number
  replyTxt: string
  replyUsername: string
  isClan: boolean
  hasFocus: boolean
  setHasFocus: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
  sidebarCollapsed,
  isMaxi,
  resetReply,
  chatId,
  replyId,
  replyTxt,
  replyUsername,
  isClan,
  hasFocus,
  setHasFocus,
}) => {
  const { isLogin } = useAuthState()
  const isEnableTextInput = isLogin && chatId
  const { mutation } = useSubmitChat({
    callbackDone: () => {
      SpeechRecognition.stopListening()
      resetReply()
    },
    groupId: chatId,
    reply: replyId
      ? {
          messageId: replyId,
          message: replyTxt,
          username: replyUsername || "",
        }
      : undefined,
    isClan,
  })

  return (
    <div
      className={twMerge(
        "relative pt-3 duration-300",
        "max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:bg-fading-white max-md:px-4 md:bg-white",
        "max-lg:fixed max-lg:bottom-0 max-lg:left-[344px] max-lg:right-4 max-lg:pb-4",
        sidebarCollapsed && "max-lg:left-[121px]",
      )}
    >
      <div className="absolute inset-x-0 bottom-[calc(100%-5px)] hidden h-6 w-full bg-fading-white md:block" />
      <div className={twMerge("flex items-center", isMaxi && "gap-1")}>
        <div className="md:hidden">
          <TradeTokenButton isMaxi={isMaxi} />
        </div>
        <ChatInput
          onSubmit={mutation.mutate}
          isPending={mutation.isPending}
          isDisabledInput={!isEnableTextInput}
          replyUsername={replyUsername}
          hasFocus={hasFocus}
          setHasFocus={setHasFocus}
          resetRely={resetReply}
          wrapperClassName="w-full max-w-full max-md:pl-3 md:bottom-[calc(100%-72px)]"
        />
      </div>
    </div>
  )
}

export default SendMessage
